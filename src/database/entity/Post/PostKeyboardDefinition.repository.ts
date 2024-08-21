import { Repository } from 'typeorm';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostKeyboardDefinitionEntity } from '@src/database/entity/Post/PostKeyboardDefinition.entity';
import { PostKeyboardDefinitionType } from '@src/database/entity/Post/type/PostKeyboardLayout.type';

import { EditPostKeyboardDefinitionData } from '@src/core-domain/post/data/EditPostKeyboardDefinitionData';

@CustomRepository(PostKeyboardDefinitionEntity)
export class PostKeyboardDefinitionRepository extends Repository<PostKeyboardDefinitionEntity> {
  async findKeyboardDefinition(postId: number): Promise<PostKeyboardDefinitionEntity> {
    const row = await this.createQueryBuilder('definition')
      .select(['definition.id', 'definition.keyboardDefinition', 'definition.layoutOptionKeys'])
      .leftJoin('definition.post', 'post')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }

  async editPostKeyboardDefinition(
    targetPostId: number,
    { keyboardDefinition, layoutOptionKeys }: EditPostKeyboardDefinitionData,
  ): Promise<void> {
    const existkeyboardDefinition = await this.findKeyboardDefinition(targetPostId);

    if (existkeyboardDefinition) {
      await this.update(
        { post: { id: targetPostId } },
        {
          definitionName: keyboardDefinition.name,
          keyboardDefinition,
          layoutOptionKeys: layoutOptionKeys ? layoutOptionKeys.map((layoutOption) => layoutOption || 0) : [],
        },
      );
    }

    if (!existkeyboardDefinition) {
      await this.save(
        this.create({
          definitionName: keyboardDefinition.name,
          keyboardDefinition,
          layoutOptionKeys: layoutOptionKeys ? layoutOptionKeys.map((layoutOption) => layoutOption || 0) : [],
          post: { id: targetPostId },
        }),
      );
    }
  }

  async editPostSwitchOnLayout(definitionId: number, editDefinition: PostKeyboardDefinitionType) {
    await this.update(definitionId, {
      keyboardDefinition: editDefinition,
    });
  }

  async editPostKeycapOnLayout(definitionId: number, editDefinition: PostKeyboardDefinitionType) {
    await this.update(definitionId, {
      keyboardDefinition: editDefinition,
    });
  }
}
