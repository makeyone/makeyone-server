import { KeyboardKeycapProfileUnion } from '@src/core/core-enum/Post/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@src/core/core-enum/Post/KeyboardKeycapTexture.enum';

export class FindPostKeycapResult {
  constructor(
    readonly id: number,
    readonly keycapName: string,
    readonly keycapProfile: KeyboardKeycapProfileUnion,
    readonly keycapTexture: KeyboardKeycapTextureUnion,
    readonly manufacturer: string | null,
    readonly remark: string | null,
  ) {}
}
