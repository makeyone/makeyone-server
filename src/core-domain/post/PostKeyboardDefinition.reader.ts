import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PostKeyboardDefinitionRepository } from '@src/database/entity/Post/PostKeyboardDefinition.repository';

import { FindPostKeyboardDefinitionResult } from '@src/core-domain/post/result/FindPostKeyboardDefinitionResult';

@Injectable()
export class PostKeyboardDefinitionReader {
  constructor(private readonly postKeyboardDefinitionRepository: PostKeyboardDefinitionRepository) {}

  async findPostKeyboardDefinition(postId: number): Promise<FindPostKeyboardDefinitionResult> {
    const KeyboardDefinition = await this.postKeyboardDefinitionRepository.findKeyboardDefinition(postId);

    return plainToInstance(FindPostKeyboardDefinitionResult, KeyboardDefinition);
  }
}
