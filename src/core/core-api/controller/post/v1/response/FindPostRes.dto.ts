import { FindPostFoamResult } from '@src/core/core-domain/domain/post/result/FindPostFoamResult';
import { FindPostHousingResult } from '@src/core/core-domain/domain/post/result/FindPostHousingResult';
import { FindPostImageResult } from '@src/core/core-domain/domain/post/result/FindPostImageResult';
import { FindPostKeyboardDefinitionResult } from '@src/core/core-domain/domain/post/result/FindPostKeyboardDefinitionResult';
import { FindPostKeycapResult } from '@src/core/core-domain/domain/post/result/FindPostKeycapResult';
import { FindPostPlateResult } from '@src/core/core-domain/domain/post/result/FindPostPlateResult';
import { FindPostPrintedCircuitBoardResult } from '@src/core/core-domain/domain/post/result/FindPostPrintedCircuitBoardResult';
import { FindPostResult } from '@src/core/core-domain/domain/post/result/FindPostResult';
import { FindPostStabilizerResult } from '@src/core/core-domain/domain/post/result/FindPostStabilizerResult';
import { FindPostSwitchResult } from '@src/core/core-domain/domain/post/result/FindPostSwitchResult';
import { FindPostVideoResult } from '@src/core/core-domain/domain/post/result/FindPostVideoResult';
import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

export class FindPostRes {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly isPublished: boolean,
    readonly postTitle: string | null,
    readonly postContent: string | null,
    readonly postedUser: Pick<FindUserResult, 'id' | 'nickname' | 'profileImg'>,
    readonly postImages: FindPostImageResult[],
    readonly postHousing: FindPostHousingResult | null,
    readonly postSwitches: FindPostSwitchResult[],
    readonly postKeycaps: FindPostKeycapResult[],
    readonly postStabilizers: FindPostStabilizerResult[],
    readonly postKeyboardDefinition: FindPostKeyboardDefinitionResult | null,
    readonly postPrintedCircuitBoard: FindPostPrintedCircuitBoardResult | null,
    readonly postPlate: FindPostPlateResult | null,
    readonly postFoam: FindPostFoamResult | null,
    readonly postVideo: FindPostVideoResult | null,
  ) {}

  static of(
    post: FindPostResult,
    images: FindPostImageResult[],
    housing: FindPostHousingResult | null,
    switches: FindPostSwitchResult[],
    keycaps: FindPostKeycapResult[],
    stabilizers: FindPostStabilizerResult[],
    keyboardDefinition: FindPostKeyboardDefinitionResult | null,
    printedCircuitBoard: FindPostPrintedCircuitBoardResult | null,
    plate: FindPostPlateResult | null,
    foam: FindPostFoamResult | null,
    video: FindPostVideoResult | null,
  ): FindPostRes {
    return new FindPostRes(
      post.id,
      post.createdAt,
      post.isPublished,
      post.postTitle,
      post.postContent,
      post.postedUser,
      images,
      housing,
      switches,
      keycaps,
      stabilizers,
      keyboardDefinition,
      printedCircuitBoard,
      plate,
      foam,
      video,
    );
  }
}
