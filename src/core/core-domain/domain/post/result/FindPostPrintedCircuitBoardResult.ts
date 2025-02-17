import { KeyboardPrintedCircuitBoardTypeUnion } from '@src/core/core-enum/Post/KeyboardPCBType.enum';

export class FindPostPrintedCircuitBoardResult {
  constructor(
    readonly id: number,
    readonly pcbName: string,
    readonly pcbThickness: number,
    readonly pcbType: KeyboardPrintedCircuitBoardTypeUnion,
    readonly isFlexCutPcb: boolean,
    readonly isRgbPcb: boolean,
    readonly remark: string | null,
  ) {}
}
