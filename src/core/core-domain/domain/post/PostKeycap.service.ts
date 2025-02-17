import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Transactional } from 'typeorm-transactional';

import { CreatePostKeycapData } from '@src/core/core-domain/domain/post/data/CreatePostKeycapData';
import { EditPostKeycapData } from '@src/core/core-domain/domain/post/data/EditPostKeycapData';
import { PostKeycapCreator } from '@src/core/core-domain/domain/post/PostKeycap.creator';
import { PostKeycapEditor } from '@src/core/core-domain/domain/post/PostKeycap.editor';
import { PostKeycapReader } from '@src/core/core-domain/domain/post/PostKeycap.reader';
import { PostKeycapRemover } from '@src/core/core-domain/domain/post/PostKeycap.remover';
import { FindPostKeycapResult } from '@src/core/core-domain/domain/post/result/FindPostKeycapResult';

@Injectable()
export class PostKeycapService {
  constructor(
    private readonly postKeycapReader: PostKeycapReader,
    private readonly postKeycapCreator: PostKeycapCreator,
    private readonly postKeycapEditor: PostKeycapEditor,
    private readonly postKeycapRemover: PostKeycapRemover,
  ) {}

  async findPostKeycapList(postId: number): Promise<FindPostKeycapResult[]> {
    const keycapList = await this.postKeycapReader.findPostKeycapList(postId);

    return keycapList;
  }

  @Transactional()
  async editPostKeycapList(targetPostId: number, keycapList: EditPostKeycapData[]): Promise<number> {
    // 기존에 등록된 키캡을 가져오고 keycapId 기준으로 매핑
    const existingKeycaps = await this.postKeycapReader.findPostKeycapList(targetPostId);
    const existingKeycapsMap = new Map(existingKeycaps.map((keycap) => [keycap.id, keycap]));

    // 수정된 키캡 목록에서 기존 키캡이 제거되었으면 삭제
    for (const existingKeycap of existingKeycaps) {
      const keycapExists = keycapList.some((keycap) => keycap.keycapId === existingKeycap.id);
      if (!keycapExists) {
        await this.postKeycapRemover.removePostKeycap(existingKeycap.id);
        existingKeycapsMap.delete(existingKeycap.id);
      }
    }

    for (const keycap of keycapList) {
      // 기존의 키캡이 아직 있으면 update
      if (existingKeycapsMap.has(keycap.keycapId) === true) {
        await this.postKeycapEditor.editPostKeycap(keycap);
      }

      // 기존의 키캡이 없으면 insert
      if (existingKeycapsMap.has(keycap.keycapId) === false) {
        await this.postKeycapCreator.createPostKeycap(
          targetPostId,
          plainToInstance(CreatePostKeycapData, {
            keycapName: keycap.keycapName,
            keycapProfile: keycap.keycapProfile,
            keycapTexture: keycap.keycapTexture,
            manufacturer: keycap.manufacturer,
            remark: keycap.remark,
          }),
        );
      }
    }

    return targetPostId;
  }
}
