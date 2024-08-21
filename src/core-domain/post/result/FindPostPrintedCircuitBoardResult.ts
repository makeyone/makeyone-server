import { KeyboardPrintedCircuitBoardTypeUnion } from '@src/core-enum/Post/KeyboardPCBType.enum';

export class FindPostPrintedCircuitBoardResult {
  id: number;
  pcbName: string;
  pcbThickness: number;
  pcbType: KeyboardPrintedCircuitBoardTypeUnion;
  isFlexCutPcb: boolean;
  isRgbPcb: boolean;
  remark: string | null;
}
