import { KeyboardPrintedCircuitBoardTypeUnion } from '@src/core/core-enum/Post/KeyboardPCBType.enum';

export class EditPostPrintedCircuitBoardData {
  constructor(
    readonly pcbName: string,
    readonly pcbType: KeyboardPrintedCircuitBoardTypeUnion,
    readonly isRgbPcb: boolean,
    readonly isFlexCutPcb: boolean,
    readonly pcbThickness?: number,
    readonly remark?: string,
  ) {}
}
