import { Repository } from 'typeorm';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostStabilizerEntity } from '@src/database/entity/Post/PostStabilizer.entity';

import { CreatePostStabilizerData } from '@src/core-domain/post/data/CreatePostStabilizerData';
import { EditPostStabilizerData } from '@src/core-domain/post/data/EditPostStabilizerData';

@CustomRepository(PostStabilizerEntity)
export class PostStabilizerRepository extends Repository<PostStabilizerEntity> {
  async findStabilizerList(postId: number): Promise<PostStabilizerEntity[]> {
    const rows = await this.createQueryBuilder('stabilizer')
      .select([
        'stabilizer.id',
        'stabilizer.stabilizerName',
        'stabilizer.stabilizerType',
        'stabilizer.stabilizerMount',
        'stabilizer.remark',
      ])
      .leftJoin('stabilizer.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();
    return rows;
  }

  async findStabilizer(stabilizerId: number): Promise<PostStabilizerEntity> {
    const row = await this.createQueryBuilder('stabilizer')
      .select([
        'stabilizer.id',
        'stabilizer.stabilizerName',
        'stabilizer.stabilizerType',
        'stabilizer.stabilizerMount',
        'stabilizer.remark',
      ])
      .where('stabilizer.id = :stabilizerId', { stabilizerId })
      .getOne();
    return row;
  }

  async createPostStabilizer(targetPostId: number, createPostStabilizerData: CreatePostStabilizerData): Promise<void> {
    await this.save(this.create({ ...createPostStabilizerData, post: { id: targetPostId } }));
  }

  async editPostStabilizer({
    stabilizerId,
    stabilizerName,
    stabilizerType,
    stabilizerMount,
    remark,
  }: EditPostStabilizerData): Promise<void> {
    await this.update(stabilizerId, {
      stabilizerName,
      stabilizerType,
      stabilizerMount,
      remark: remark || null,
    });
  }

  async removePostStabilizer(stabilizerId: number): Promise<void> {
    await this.delete(stabilizerId);
  }
}
