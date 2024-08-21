import { KeyboardStabilizerMountUnion } from '@src/core-enum/Post/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion } from '@src/core-enum/Post/KeyboardStabilizerType.enum';

export class FindPostStabilizerResult {
  id: number;
  stabilizerName: string;
  stabilizerType: KeyboardStabilizerTypeUnion;
  stabilizerMount: KeyboardStabilizerMountUnion;
  remark: string | null;
}
