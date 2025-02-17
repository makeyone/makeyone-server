import { Injectable } from '@nestjs/common';

import { EditPostKeyboardDefinitionData } from '@src/core/core-domain/domain/post/data/EditPostKeyboardDefinitionData';
import { EditPostKeycapOnLayoutData } from '@src/core/core-domain/domain/post/data/EditPostKeycapOnLayoutData';
import { EditPostSwitchOnLayoutData } from '@src/core/core-domain/domain/post/data/EditPostSwitchOnLayoutData';
import { PostKeyboardDefinitionEditor } from '@src/core/core-domain/domain/post/PostKeyboardDefinition.editor';
import { PostKeyboardDefinitionReader } from '@src/core/core-domain/domain/post/PostKeyboardDefinition.reader';
import { PostKeycapReader } from '@src/core/core-domain/domain/post/PostKeycap.reader';
import { PostSwitchReader } from '@src/core/core-domain/domain/post/PostSwitch.reader';
import { EditPostKeyboardDefinitionResult } from '@src/core/core-domain/domain/post/result/EditPostKeyboardDefinitionResult';
import { FindPostKeyboardDefinitionResult } from '@src/core/core-domain/domain/post/result/FindPostKeyboardDefinitionResult';

import { PostKeyboardLayoutKey } from '@src/database/entity/Post/type/PostKeyboardLayout.type';

@Injectable()
export class PostKeyboardDefinitionService {
  constructor(
    private readonly postSwitchReader: PostSwitchReader,
    private readonly postKeycapReader: PostKeycapReader,
    private readonly postKeyboardDefinitionReader: PostKeyboardDefinitionReader,
    private readonly postKeyboardDefinitionEditor: PostKeyboardDefinitionEditor,
  ) {}

  async findPostKeyboardDefinition(postId: number): Promise<FindPostKeyboardDefinitionResult> {
    const keyboardDefinition = await this.postKeyboardDefinitionReader.findPostKeyboardDefinition(postId);

    return keyboardDefinition;
  }

  async editPostKeyboardDefinition(
    targetPostId: number,
    editPostKeyboardDefinitionData: EditPostKeyboardDefinitionData,
  ): Promise<EditPostKeyboardDefinitionResult> {
    await this.postKeyboardDefinitionEditor.editPostKeyboardDefinition(targetPostId, editPostKeyboardDefinitionData);

    return {
      editedPostId: targetPostId,
      definitionName: editPostKeyboardDefinitionData.keyboardDefinition.name,
      layoutOptionKeys: editPostKeyboardDefinitionData.layoutOptionKeys,
      keyboardDefinition: editPostKeyboardDefinitionData.keyboardDefinition,
    };
  }

  async editPostSwitchOnLayout(
    targetPostId: number,
    targetSwitchId: number,
    wantToRegisterKeys: EditPostSwitchOnLayoutData[],
  ): Promise<number> {
    const keyboardSwitch = await this.postSwitchReader.findPostSwitch(targetSwitchId);
    const definition = await this.postKeyboardDefinitionReader.findPostKeyboardDefinition(targetPostId);
    const definitionId = definition.id;
    const copyDefinition = { ...definition };
    const editDefinition = { ...definition.keyboardDefinition };

    // 일반 키에 스위치를 등록한다.
    const layoutKeys = copyDefinition.keyboardDefinition.layouts.keys;
    for (const wantToRegisterKey of wantToRegisterKeys) {
      const findKey: PostKeyboardLayoutKey = layoutKeys.find(
        (layoutKey) => layoutKey.row === wantToRegisterKey.row && layoutKey.col === wantToRegisterKey.col,
      );
      if (findKey) {
        findKey.registeredSwitch = {
          id: keyboardSwitch.id,
          switchName: keyboardSwitch.switchName,
        };
      }
    }
    editDefinition.layouts.keys = layoutKeys;

    // 옵션 키에 스위치를 등록한다
    const optionKeys = copyDefinition.layoutOptionKeys;
    const layoutOptionKeys = copyDefinition.keyboardDefinition.layouts.optionKeys;
    Object.entries(layoutOptionKeys).flatMap(([key, options]) => {
      const index = parseInt(key, 10);
      const keys = optionKeys[index] ? options[optionKeys[index]] : options[0];
      for (const wantToRegisterKey of wantToRegisterKeys) {
        const findOptionKey: PostKeyboardLayoutKey = keys.find(
          (key) => key.col === wantToRegisterKey.col && key.row === wantToRegisterKey.row,
        );
        if (findOptionKey) {
          findOptionKey.registeredSwitch = {
            id: keyboardSwitch.id,
            switchName: keyboardSwitch.switchName,
          };
        }
      }
    });
    editDefinition.layouts.optionKeys = layoutOptionKeys;

    await this.postKeyboardDefinitionEditor.editPostSwitchOnLayout(definitionId, editDefinition);

    return targetPostId;
  }

  async editPostKeycapOnLayout(
    targetPostId: number,
    targetKeycapId: number,
    wantToRegisterKeys: EditPostKeycapOnLayoutData[],
  ): Promise<number> {
    const keyboardKeycap = await this.postKeycapReader.findPostKeycap(targetKeycapId);
    const definition = await this.postKeyboardDefinitionReader.findPostKeyboardDefinition(targetPostId);
    const definitionId = definition.id;
    const copyDefinition = { ...definition };
    const editDefinition = { ...definition.keyboardDefinition };

    // 일반 키에 키캡을 등록한다.
    const layoutKeys = copyDefinition.keyboardDefinition.layouts.keys;
    for (const wantToRegisterKey of wantToRegisterKeys) {
      const findKey: PostKeyboardLayoutKey = layoutKeys.find(
        (layoutKey) => layoutKey.row === wantToRegisterKey.row && layoutKey.col === wantToRegisterKey.col,
      );
      if (findKey) {
        findKey.registeredKeycap = {
          id: keyboardKeycap.id,
          keycapName: keyboardKeycap.keycapName,
        };
      }
    }
    editDefinition.layouts.keys = layoutKeys;

    // 옵션 키에 키캡을 등록한다
    const optionKeys = copyDefinition.layoutOptionKeys;
    const layoutOptionKeys = copyDefinition.keyboardDefinition.layouts.optionKeys;
    Object.entries(layoutOptionKeys).flatMap(([key, options]) => {
      const index = parseInt(key, 10);
      const keys = optionKeys[index] ? options[optionKeys[index]] : options[0];
      for (const wantToRegisterKey of wantToRegisterKeys) {
        const findOptionKey: PostKeyboardLayoutKey = keys.find(
          (key) => key.col === wantToRegisterKey.col && key.row === wantToRegisterKey.row,
        );
        if (findOptionKey) {
          findOptionKey.registeredKeycap = {
            id: keyboardKeycap.id,
            keycapName: keyboardKeycap.keycapName,
          };
        }
      }
    });
    editDefinition.layouts.optionKeys = layoutOptionKeys;

    await this.postKeyboardDefinitionEditor.editPostKeycapOnLayout(definitionId, editDefinition);

    return targetPostId;
  }
}
