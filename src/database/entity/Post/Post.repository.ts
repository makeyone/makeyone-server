import { Repository } from 'typeorm';
import { buildPaginator, Cursor } from 'typeorm-cursor-pagination';

import { FindPostListData } from '@src/core/core-domain/domain/post/data/FindPostListData';

import { CustomRepository } from '@src/database/decorator/TypeOrmCustomRepository.decorator';
import { PostEntity } from '@src/database/entity/Post/Post.entity';

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findPostList({ limit, nextCursor }: FindPostListData): Promise<{
    postList: PostEntity[];
    totalResults: number;
    cursor: Cursor;
  }> {
    const queryBuilder = this.createQueryBuilder('post')
      .select([
        'post.id',
        'post.createdAt',
        'post.isPublished',
        'post.postTitle',
        'user.id',
        'user.profileImg',
        'user.nickname',
      ])
      .leftJoin('post.postedUser', 'user')
      .where('post.isPublished = true');
    const paginator = buildPaginator({
      entity: PostEntity,
      paginationKeys: ['id'],
      alias: 'post',
      query: {
        limit,
        order: 'DESC',
        afterCursor: nextCursor,
      },
    });
    const totalResults = await queryBuilder.getCount();
    const { data, cursor } = await paginator.paginate(queryBuilder);

    return {
      postList: data,
      totalResults,
      cursor,
    };
  }

  async findMyPostList(
    userId: number,
    { limit, nextCursor }: FindPostListData,
  ): Promise<{
    postList: PostEntity[];
    totalResults: number;
    cursor: Cursor;
  }> {
    const queryBuilder = this.createQueryBuilder('post')
      .select([
        'post.id',
        'post.createdAt',
        'post.isPublished',
        'post.postTitle',
        'user.id',
        'user.profileImg',
        'user.nickname',
      ])
      .leftJoin('post.postedUser', 'user')
      .where('post.isPublished = true')
      .andWhere('user.id = :userId', { userId });
    const paginator = buildPaginator({
      entity: PostEntity,
      paginationKeys: ['id'],
      alias: 'post',
      query: {
        limit,
        order: 'DESC',
        afterCursor: nextCursor,
      },
    });
    const totalResults = await queryBuilder.getCount();
    const { data, cursor } = await paginator.paginate(queryBuilder);

    return {
      postList: data,
      totalResults,
      cursor,
    };
  }

  async findPostById(postId: number): Promise<PostEntity> {
    const row = await this.createQueryBuilder('post')
      .select([
        'post.id',
        'post.createdAt',
        'post.isPublished',
        'post.postTitle',
        'post.postContent',
        'user.id',
        'user.profileImg',
        'user.nickname',
      ])
      .leftJoin('post.postedUser', 'user')
      .where('post.id = :postId', { postId })
      .getOne();

    return row;
  }

  async createPost(userId: number): Promise<PostEntity> {
    const createdPost = await this.save(this.create({ postedUser: { id: userId } }));
    return createdPost;
  }

  async editPostTitle(targetPostId: number, postTitle: string): Promise<void> {
    await this.update(targetPostId, { postTitle });
  }

  async editPostContent(targetPostId: number, postContent: string): Promise<void> {
    await this.update(targetPostId, { postContent: postContent });
  }

  async editPostSetting(targetPostId: number, isPublished: boolean): Promise<void> {
    await this.update(targetPostId, { isPublished });
  }
}
