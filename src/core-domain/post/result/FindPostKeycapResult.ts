import { KeyboardKeycapProfileUnion } from '@src/core-enum/Post/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@src/core-enum/Post/KeyboardKeycapTexture.enum';

export class FindPostKeycapResult {
  id: number;
  keycapName: string;
  keycapProfile: KeyboardKeycapProfileUnion;
  keycapTexture: KeyboardKeycapTextureUnion;
  manufacturer: string | null;
  remark: string | null;
}
