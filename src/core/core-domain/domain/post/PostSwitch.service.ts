import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Transactional } from 'typeorm-transactional';

import { CreatePostSwitchData } from '@src/core/core-domain/domain/post/data/CreatePostSwitchData';
import { EditPostSwitchData } from '@src/core/core-domain/domain/post/data/EditPostSwitchData';
import { PostSwitchCreator } from '@src/core/core-domain/domain/post/PostSwitch.creator';
import { PostSwitchEditor } from '@src/core/core-domain/domain/post/PostSwitch.editor';
import { PostSwitchReader } from '@src/core/core-domain/domain/post/PostSwitch.reader';
import { PostSwitchRemover } from '@src/core/core-domain/domain/post/PostSwitch.remover';
import { FindPostSwitchResult } from '@src/core/core-domain/domain/post/result/FindPostSwitchResult';

@Injectable()
export class PostSwitchService {
  constructor(
    private readonly postSwitchReader: PostSwitchReader,
    private readonly postSwitchCreator: PostSwitchCreator,
    private readonly postSwitchEditor: PostSwitchEditor,
    private readonly postSwitchRemover: PostSwitchRemover,
  ) {}

  async findPostSwitchList(postId: number): Promise<FindPostSwitchResult[]> {
    const switchList = await this.postSwitchReader.findPostSwitchList(postId);

    return switchList;
  }

  @Transactional()
  async editPostSwitchList(targetPostId: number, switchList: EditPostSwitchData[]): Promise<number> {
    // 기존에 등록된 스위치를 가져오고 switchId 기준으로 매핑
    const existingSwitches = await this.postSwitchReader.findPostSwitchList(targetPostId);
    const existingSwitchesMap = new Map(existingSwitches.map((switchItem) => [switchItem.id, switchItem]));

    // 수정된 스위치 목록에서 기존 스위치가 제거되었으면 삭제
    for (const existingSwitch of existingSwitches) {
      const switchExists = switchList.some((switchItem) => switchItem.switchId === existingSwitch.id);
      if (!switchExists) {
        await this.postSwitchRemover.removePostSwitch(existingSwitch.id);
        existingSwitchesMap.delete(existingSwitch.id);
      }
    }

    for (const switchItem of switchList) {
      // 기존의 스위치가 아직 있으면 update
      if (existingSwitchesMap.has(switchItem.switchId) === true) {
        await this.postSwitchEditor.editPostSwitch(switchItem);
      }

      // 기존의 스위치가 없으면 insert
      if (existingSwitchesMap.has(switchItem.switchId) === false) {
        await this.postSwitchCreator.createPostSwitch(
          targetPostId,
          plainToInstance(CreatePostSwitchData, {
            switchName: switchItem.switchName,
            switchType: switchItem.switchType,
            isSlientSwitch: switchItem.isSlientSwitch,
            switchLube: switchItem.switchLube,
            bottomOutForce: switchItem.bottomOutForce,
            springLength: switchItem.springLength,
            switchFilm: switchItem.switchFilm,
            remark: switchItem.remark,
          }),
        );
      }
    }

    return targetPostId;
  }
}
