import { Injectable } from '@nestjs/common';

import { EditPostKeyboardDefinitionData } from '@src/core/core-domain/domain/post/data/EditPostKeyboardDefinitionData';

import { PostKeyboardDefinitionRepository } from '@src/database/entity/Post/PostKeyboardDefinition.repository';
import { PostKeyboardDefinitionType } from '@src/database/entity/Post/type/PostKeyboardLayout.type';

@Injectable()
export class PostKeyboardDefinitionEditor {
  constructor(private readonly postKeyboardDefinitionRepository: PostKeyboardDefinitionRepository) {}

  async editPostKeyboardDefinition(
    targetPostId: number,
    keyboardDefinitionData: EditPostKeyboardDefinitionData,
  ): Promise<void> {
    await this.postKeyboardDefinitionRepository.editPostKeyboardDefinition(targetPostId, keyboardDefinitionData);
  }

  async editPostSwitchOnLayout(definitionId: number, editDefinition: PostKeyboardDefinitionType): Promise<void> {
    await this.postKeyboardDefinitionRepository.editPostSwitchOnLayout(definitionId, editDefinition);
  }

  async editPostKeycapOnLayout(definitionId: number, editDefinition: PostKeyboardDefinitionType): Promise<void> {
    await this.postKeyboardDefinitionRepository.editPostKeycapOnLayout(definitionId, editDefinition);
  }
}
