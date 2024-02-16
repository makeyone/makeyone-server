import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { CreatePostOutput } from '@src/apps/post/dto/CreatePost.dto';
import { GetPostByIdOutput, GetPostByIdParam } from '@src/apps/post/dto/GetPostById.dto';
import { PostQueryRepository } from '@src/apps/post/PostQueryRepository';

@Injectable()
export class PostService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly postQueryRepository: PostQueryRepository,
  ) {}

  async getPostById({ postId }: GetPostByIdParam): Promise<GetPostByIdOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }

    return {
      ok: true,
      post,
    };
  }

  async createPost(me: UserEntity): Promise<CreatePostOutput> {
    const createdPost = await this.postRepository.save(this.postRepository.create({ postedUser: me }));

    return {
      ok: true,
      createdPostId: createdPost.id,
    };
  }
}
