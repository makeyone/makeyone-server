import { KeyboardPlateTextureUnion } from '@src/core-enum/Post/KeyboardPlateTexture.enum';

export class FindPostPlateResult {
  id: number;
  plateName: string;
  plateTexture: KeyboardPlateTextureUnion;
  isHalfPlate: boolean;
  isFlexCutPlate: boolean;
  remark: string | null;
}
