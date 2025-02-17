import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'SUCCESS' | 'ERROR';
type EnumTypeGeneric = ApiResponseResultType<EnumCode>;

@Enum<EnumTypeGeneric>('code')
export class ApiResponseResultType<CodeType extends EnumCode> extends EnumType<EnumTypeGeneric>() {
  static readonly SUCCESS = new ApiResponseResultType('SUCCESS');
  static readonly ERROR = new ApiResponseResultType('ERROR');

  private constructor(readonly _code: CodeType) {
    super();
  }

  get code(): CodeType {
    return this._code;
  }
}

export type ApiResponseResultTypeUnion = EnumConstNames<typeof ApiResponseResultType>;
