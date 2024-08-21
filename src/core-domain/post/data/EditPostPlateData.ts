import { KeyboardPlateTextureUnion } from '@src/core-enum/Post/KeyboardPlateTexture.enum';

export class EditPostPlateData {
  constructor(
    readonly plateName: string,
    readonly plateTexture: KeyboardPlateTextureUnion,
    readonly isFlexCutPlate: boolean,
    readonly isHalfPlate: boolean,
    readonly remark?: string,
  ) {}
}
