import { Repository } from 'typeorm';

import { CreatePostSwitchData } from '@src/core/core-domain/domain/post/data/CreatePostSwitchData';
import { EditPostSwitchData } from '@src/core/core-domain/domain/post/data/EditPostSwitchData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostSwitchEntity } from '@src/database/entity/Post/PostSwitch.entity';

@CustomRepository(PostSwitchEntity)
export class PostSwitchRepository extends Repository<PostSwitchEntity> {
  async findSwitchList(postId: number): Promise<PostSwitchEntity[]> {
    const rows = await this.createQueryBuilder('switch')
      .select([
        'switch.id',
        'switch.switchName',
        'switch.switchType',
        'switch.isSlientSwitch',
        'switch.switchLube',
        'switch.bottomOutForce',
        'switch.springLength',
        'switch.switchFilm',
        'switch.remark',
      ])
      .leftJoin('switch.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();
    return rows;
  }

  async findSwitch(switchId: number): Promise<PostSwitchEntity> {
    const row = await this.createQueryBuilder('switch')
      .select([
        'switch.id',
        'switch.switchName',
        'switch.switchType',
        'switch.isSlientSwitch',
        'switch.switchLube',
        'switch.bottomOutForce',
        'switch.springLength',
        'switch.switchFilm',
        'switch.remark',
      ])
      .where('switch.id = :switchId', { switchId })
      .getOne();
    return row;
  }

  async createPostSwitch(targetPostId: number, createPostSwitchData: CreatePostSwitchData): Promise<void> {
    await this.save(this.create({ ...createPostSwitchData, post: { id: targetPostId } }));
  }

  async editPostSwitch({
    switchId,
    switchName,
    switchType,
    isSlientSwitch,
    switchLube,
    bottomOutForce,
    springLength,
    switchFilm,
    remark,
  }: EditPostSwitchData): Promise<void> {
    await this.update(switchId, {
      switchName: switchName,
      switchType: switchType,
      isSlientSwitch: isSlientSwitch,
      switchLube: switchLube,
      bottomOutForce: bottomOutForce || null,
      springLength: springLength || null,
      switchFilm: switchFilm || null,
      remark: remark || null,
    });
  }

  async removePostSwitch(switchId: number): Promise<void> {
    await this.delete(switchId);
  }
}
