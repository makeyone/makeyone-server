import { Repository } from 'typeorm';

import { CreatePostKeycapData } from '@src/core/core-domain/domain/post/data/CreatePostKeycapData';
import { EditPostKeycapData } from '@src/core/core-domain/domain/post/data/EditPostKeycapData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostKeycapEntity } from '@src/database/entity/Post/PostKeycap.entity';

@CustomRepository(PostKeycapEntity)
export class PostKeycapRepository extends Repository<PostKeycapEntity> {
  async findKeycapList(postId: number): Promise<PostKeycapEntity[]> {
    const rows = await this.createQueryBuilder('keycap')
      .select([
        'keycap.id',
        'keycap.keycapName',
        'keycap.keycapProfile',
        'keycap.keycapTexture',
        'keycap.manufacturer',
        'keycap.remark',
      ])
      .leftJoin('keycap.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();
    return rows;
  }

  async findKeycap(keycapId: number): Promise<PostKeycapEntity> {
    const row = await this.createQueryBuilder('keycap')
      .select([
        'keycap.id',
        'keycap.keycapName',
        'keycap.keycapProfile',
        'keycap.keycapTexture',
        'keycap.manufacturer',
        'keycap.remark',
      ])
      .where('keycap.id = :keycapId', { keycapId })
      .getOne();
    return row;
  }

  async createPostKeycap(targetPostId: number, createPostKeycapData: CreatePostKeycapData): Promise<void> {
    await this.save(this.create({ ...createPostKeycapData, post: { id: targetPostId } }));
  }

  async editPostKeycap({
    keycapId,
    keycapName,
    keycapProfile,
    keycapTexture,
    manufacturer,
    remark,
  }: EditPostKeycapData): Promise<void> {
    await this.update(keycapId, {
      keycapName,
      keycapProfile,
      keycapTexture,
      manufacturer: manufacturer || null,
      remark: remark || null,
    });
  }

  async removePostKeycap(keycapId: number): Promise<void> {
    await this.delete(keycapId);
  }
}
