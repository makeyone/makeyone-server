import { KeyboardPlateTextureUnion } from '@src/core/core-enum/Post/KeyboardPlateTexture.enum';

export class FindPostPlateResult {
  constructor(
    readonly id: number,
    readonly plateName: string,
    readonly plateTexture: KeyboardPlateTextureUnion,
    readonly isHalfPlate: boolean,
    readonly isFlexCutPlate: boolean,
    readonly remark: string | null,
  ) {}
}
