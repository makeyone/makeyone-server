import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'SUCCESS' | 'ERROR';
type EnumName = '성공' | '에러';
type EnumTypeGeneric = ApiResponseResultType<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class ApiResponseResultType<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly SUCCESS = new ApiResponseResultType('SUCCESS', '성공');
  static readonly ERROR = new ApiResponseResultType('ERROR', '에러');

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

export type ApiResponseResultTypeUnion = EnumConstNames<typeof ApiResponseResultType>;
export const apiResponseResultTypeKeys = ApiResponseResultType.keys();
export const apiResponseResultTypeValues = ApiResponseResultType.values();
