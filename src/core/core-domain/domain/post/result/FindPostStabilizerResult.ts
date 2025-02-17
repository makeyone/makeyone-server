import { KeyboardStabilizerMountUnion } from '@src/core/core-enum/Post/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion } from '@src/core/core-enum/Post/KeyboardStabilizerType.enum';

export class FindPostStabilizerResult {
  constructor(
    readonly id: number,
    readonly stabilizerName: string,
    readonly stabilizerType: KeyboardStabilizerTypeUnion,
    readonly stabilizerMount: KeyboardStabilizerMountUnion,
    readonly remark: string | null,
  ) {}
}
