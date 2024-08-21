import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Solder' | 'HotSwap' | 'MillMax';
type EnumName = '솔더링' | '핫스왑' | '밀맥스';
type EnumTypeGeneric = KeyboardPrintedCircuitBoardType<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPrintedCircuitBoardType<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly Solder = new KeyboardPrintedCircuitBoardType('Solder', '솔더링');
  static readonly HotSwap = new KeyboardPrintedCircuitBoardType('HotSwap', '핫스왑');
  static readonly MillMax = new KeyboardPrintedCircuitBoardType('MillMax', '밀맥스');

  private constructor(readonly _code: CodeType, readonly _name: NameType) {
    super();
  }

  get code(): CodeType {
    return this._code;
  }

  get name(): NameType {
    return this._name;
  }
}

export type KeyboardPrintedCircuitBoardTypeUnion = EnumConstNames<typeof KeyboardPrintedCircuitBoardType>;
export const keyboardPrintedCircuitBoardTypeKeys = KeyboardPrintedCircuitBoardType.keys();
export const keyboardPrintedCircuitBoardTypeValues = KeyboardPrintedCircuitBoardType.values();
