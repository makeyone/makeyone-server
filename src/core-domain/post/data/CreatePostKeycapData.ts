import { KeyboardKeycapProfileUnion } from '@src/core-enum/Post/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@src/core-enum/Post/KeyboardKeycapTexture.enum';

export class CreatePostKeycapData {
  constructor(
    readonly keycapName: string,
    readonly keycapProfile: KeyboardKeycapProfileUnion,
    readonly keycapTexture: KeyboardKeycapTextureUnion,
    readonly manufacturer?: string,
    readonly remark?: string,
  ) {}
}