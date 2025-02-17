import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FindPostKeyboardDefinitionResult } from '@src/core/core-domain/domain/post/result/FindPostKeyboardDefinitionResult';

import { PostKeyboardDefinitionRepository } from '@src/database/entity/Post/PostKeyboardDefinition.repository';

@Injectable()
export class PostKeyboardDefinitionReader {
  constructor(private readonly postKeyboardDefinitionRepository: PostKeyboardDefinitionRepository) {}

  async findPostKeyboardDefinition(postId: number): Promise<FindPostKeyboardDefinitionResult> {
    const KeyboardDefinition = await this.postKeyboardDefinitionRepository.findKeyboardDefinition(postId);

    return plainToInstance(FindPostKeyboardDefinitionResult, KeyboardDefinition);
  }
}
