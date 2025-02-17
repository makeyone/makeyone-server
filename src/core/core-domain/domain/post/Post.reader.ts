import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Cursor } from 'typeorm-cursor-pagination';

import { FindPostListData } from '@src/core/core-domain/domain/post/data/FindPostListData';
import { PostImageReader } from '@src/core/core-domain/domain/post/PostImage.reader';
import { FindPostListResult } from '@src/core/core-domain/domain/post/result/FindPostListResult';
import { FindPostResult } from '@src/core/core-domain/domain/post/result/FindPostResult';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

import { PostRepository } from '@src/database/entity/Post/Post.repository';

@Injectable()
export class PostReader {
  constructor(private readonly postRepository: PostRepository, private readonly postImageReader: PostImageReader) {}

  async findPostList(findPostListData: FindPostListData): Promise<{
    postList: FindPostListResult[];
    totalResults: number;
    cursor: Cursor;
  }> {
    const { postList, totalResults, cursor } = await this.postRepository.findPostList(findPostListData);
    const postListResult: FindPostListResult[] = [];
    for (const post of postList) {
      const image = await this.postImageReader.findPostImageList(post.id);
      const postResult = FindPostListResult.of(plainToInstance(FindPostResult, post), image);
      postListResult.push(postResult);
    }

    return {
      postList: postListResult,
      totalResults,
      cursor,
    };
  }

  async findPost(postId: number): Promise<FindPostResult> {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException(CoreErrorType.POST_NOT_FOUND);
    }

    return plainToInstance(FindPostResult, post);
  }
}
