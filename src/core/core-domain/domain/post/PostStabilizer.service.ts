import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Transactional } from 'typeorm-transactional';

import { CreatePostStabilizerData } from '@src/core/core-domain/domain/post/data/CreatePostStabilizerData';
import { EditPostStabilizerData } from '@src/core/core-domain/domain/post/data/EditPostStabilizerData';
import { PostStabilizerCreator } from '@src/core/core-domain/domain/post/PostStabilizer.creator';
import { PostStabilizerEditor } from '@src/core/core-domain/domain/post/PostStabilizer.editor';
import { PostStabilizerReader } from '@src/core/core-domain/domain/post/PostStabilizer.reader';
import { PostStabilizerRemover } from '@src/core/core-domain/domain/post/PostStabilizer.remover';
import { FindPostStabilizerResult } from '@src/core/core-domain/domain/post/result/FindPostStabilizerResult';

@Injectable()
export class PostStabilizerService {
  constructor(
    private readonly postStabilizerReader: PostStabilizerReader,
    private readonly postStabilizerCreator: PostStabilizerCreator,
    private readonly postStabilizerEditor: PostStabilizerEditor,
    private readonly postStabilizerRemover: PostStabilizerRemover,
  ) {}

  async findPostStabilizerList(postId: number): Promise<FindPostStabilizerResult[]> {
    const stabilizerList = await this.postStabilizerReader.findPostStabilizerList(postId);

    return stabilizerList;
  }

  @Transactional()
  async editPostStabilizerList(targetPostId: number, stabilizerList: EditPostStabilizerData[]): Promise<number> {
    // 기존에 등록된 스테빌라이저를 가져오고 stabilizerId 기준으로 매핑
    const existingStabilizers = await this.postStabilizerReader.findPostStabilizerList(targetPostId);
    const existingStabilizersMap = new Map(existingStabilizers.map((stabilizer) => [stabilizer.id, stabilizer]));

    // 수정된 스테빌라이저 목록에서 기존 스테빌라이저이 제거되었으면 삭제
    for (const existingStabilizer of existingStabilizers) {
      const stabilizerExists = stabilizerList.some((stabilizer) => stabilizer.stabilizerId === existingStabilizer.id);
      if (!stabilizerExists) {
        await this.postStabilizerRemover.removePostStabilizer(existingStabilizer.id);
        existingStabilizersMap.delete(existingStabilizer.id);
      }
    }

    for (const stabilizer of stabilizerList) {
      // 기존의 스테빌라이저가 아직 있으면 update
      if (existingStabilizersMap.has(stabilizer.stabilizerId) === true) {
        await this.postStabilizerEditor.editPostStabilizer(stabilizer);
      }

      // 기존의 스테빌라이저가 없으면 insert
      if (existingStabilizersMap.has(stabilizer.stabilizerId) === false) {
        await this.postStabilizerCreator.createPostStabilizer(
          targetPostId,
          plainToInstance(CreatePostStabilizerData, {
            stabilizerName: stabilizer.stabilizerName,
            stabilizerType: stabilizer.stabilizerType,
            stabilizerMount: stabilizer.stabilizerMount,
            remark: stabilizer.remark,
          }),
        );
      }
    }

    return targetPostId;
  }
}
