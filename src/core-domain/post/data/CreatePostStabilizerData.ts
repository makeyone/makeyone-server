import { KeyboardStabilizerMountUnion } from '@src/core-enum/Post/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion } from '@src/core-enum/Post/KeyboardStabilizerType.enum';

export class CreatePostStabilizerData {
  constructor(
    readonly stabilizerName: string,
    readonly stabilizerType: KeyboardStabilizerTypeUnion,
    readonly stabilizerMount: KeyboardStabilizerMountUnion,
    readonly remark?: string,
  ) {}
}