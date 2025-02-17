import { ForbiddenException, Injectable } from '@nestjs/common';

import { EditPostVideoData } from '@src/core/core-domain/domain/post/data/EditPostVideoData';
import { PostVideoEditor } from '@src/core/core-domain/domain/post/PostVideo.editor';
import { PostVideoReader } from '@src/core/core-domain/domain/post/PostVideo.reader';
import { PostVideoRemover } from '@src/core/core-domain/domain/post/PostVideo.remover';
import { FindPostVideoResult } from '@src/core/core-domain/domain/post/result/FindPostVideoResult';
import { CoreErrorType } from '@src/core/core-domain/support/error/CoreErrorType';

@Injectable()
export class PostVideoService {
  constructor(
    private readonly postVideoReader: PostVideoReader,
    private readonly postVideoEditor: PostVideoEditor,
    private readonly postVideoRemover: PostVideoRemover,
  ) {}

  async findPostVideo(postId: number): Promise<FindPostVideoResult> {
    const video = await this.postVideoReader.findPostVideo(postId);

    return video;
  }

  async editPostVideo(targetPostId: number, editPostVideoData: EditPostVideoData): Promise<number> {
    let videoUrl = editPostVideoData.youtubeVideoUrl || '';
    if (videoUrl.includes('youtube.com/shorts')) {
      videoUrl = videoUrl.replace('/shorts/', '/watch?v=');
    }
    const youtubeVideoUrlRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const youtubeVideoUrlMatch = videoUrl.match(youtubeVideoUrlRegExp);
    const youtubeVideoId = youtubeVideoUrlMatch && youtubeVideoUrlMatch[7].length === 11 ? youtubeVideoUrlMatch[7] : '';

    if (youtubeVideoId === '') {
      throw new ForbiddenException(CoreErrorType.INVALID_YOUTUBE_VIDEO_URL);
    }

    await this.postVideoEditor.editPostVideo(targetPostId, youtubeVideoId, editPostVideoData);
    return targetPostId;
  }

  async deletePostVideo(targetPostId: number): Promise<number> {
    await this.postVideoRemover.deletePostVideo(targetPostId);
    return targetPostId;
  }
}
