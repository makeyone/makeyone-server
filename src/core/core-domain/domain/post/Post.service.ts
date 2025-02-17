import { Injectable } from '@nestjs/common';
import { Cursor } from 'typeorm-cursor-pagination';

import { EditPostContentData } from '@src/core/core-domain/domain/post/data/EditPostContentData';
import { EditPostSettingData } from '@src/core/core-domain/domain/post/data/EditPostSettingData';
import { EditPostTitleData } from '@src/core/core-domain/domain/post/data/EditPostTitleData';
import { FindPostListData } from '@src/core/core-domain/domain/post/data/FindPostListData';
import { TargetPostWithUserData } from '@src/core/core-domain/domain/post/data/TargetPostWithUserData';
import { PostCreator } from '@src/core/core-domain/domain/post/Post.creator';
import { PostEditor } from '@src/core/core-domain/domain/post/Post.editor';
import { PostReader } from '@src/core/core-domain/domain/post/Post.reader';
import { PostRemover } from '@src/core/core-domain/domain/post/Post.remover';
import { FindPostListResult } from '@src/core/core-domain/domain/post/result/FindPostListResult';
import { FindPostResult } from '@src/core/core-domain/domain/post/result/FindPostResult';

@Injectable()
export class PostService {
  constructor(
    private readonly postReader: PostReader,
    private readonly postCreator: PostCreator,
    private readonly postEditor: PostEditor,
    private readonly postRemover: PostRemover,
  ) {}

  async findPostList(findPostListData: FindPostListData): Promise<{
    postList: FindPostListResult[];
    totalResults: number;
    cursor: Cursor;
  }> {
    const { postList, totalResults, cursor } = await this.postReader.findPostList(findPostListData);

    return { postList, totalResults, cursor };
  }

  async findPost(postId: number): Promise<FindPostResult> {
    const post = await this.postReader.findPost(postId);
    return post;
  }

  async createPost(postUserId: number): Promise<number> {
    const createdPostId = await this.postCreator.createPost(postUserId);
    return createdPostId;
  }

  async validateMyPostIfNotAdmin({ targetPostId, postedUserId, userRole }: TargetPostWithUserData): Promise<boolean> {
    if (userRole === 'ADMIN') {
      return true;
    }

    const post = await this.postReader.findPost(targetPostId);
    if (post.postedUser.id === postedUserId) {
      return true;
    }

    return false;
  }

  async editPostTitle(targetPostId: number, { postTitle }: EditPostTitleData): Promise<number> {
    await this.postEditor.editPostTitle(targetPostId, postTitle);
    return targetPostId;
  }

  async editPostContent(targetPostId: number, { content }: EditPostContentData): Promise<number> {
    await this.postEditor.editPostContent(targetPostId, content);
    return targetPostId;
  }

  async editPostSetting(targetPostId: number, { isPublished }: EditPostSettingData): Promise<number> {
    await this.postEditor.editPostSetting(targetPostId, isPublished);
    return targetPostId;
  }
}
