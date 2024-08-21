import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Cursor } from 'typeorm-cursor-pagination';

import { PostRepository } from '@src/database/entity/Post/Post.repository';

import { CoreErrorType } from '@src/core-api/support/error/CoreErrorType';
import { CursorPaginationData } from '@src/core-api/support/request/CursorPaginationData';

import { PostImageReader } from '@src/core-domain/post/PostImage.reader';
import { FindPostListResult } from '@src/core-domain/post/result/FindPostListResult';
import { FindPostResult } from '@src/core-domain/post/result/FindPostResult';

@Injectable()
export class PostReader {
  constructor(private readonly postRepository: PostRepository, private readonly postImageReader: PostImageReader) {}

  async findPostList(cursorData: CursorPaginationData): Promise<{
    postList: FindPostListResult[];
    totalResults: number;
    cursor: Cursor;
  }> {
    const { postList, totalResults, cursor } = await this.postRepository.findPostList(cursorData);
    const postListResult: FindPostListResult[] = [];
    for (const post of postList) {
      const image = await this.postImageReader.findPostImageList(post.id);
      const postResult = FindPostListResult.of(post, image);
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
