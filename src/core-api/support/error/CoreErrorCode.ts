import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class CoreErrorCode extends EnumType<CoreErrorCode>() {
  static readonly E400 = new CoreErrorCode('E400');
  static readonly E404 = new CoreErrorCode('E404');
  static readonly E413 = new CoreErrorCode('E413');
  static readonly E500 = new CoreErrorCode('E500');

  static readonly J100 = new CoreErrorCode('J100');
  static readonly J101 = new CoreErrorCode('J101');
  static readonly J102 = new CoreErrorCode('J102');
  static readonly J103 = new CoreErrorCode('J103');

  static readonly AU001 = new CoreErrorCode('AU001');
  static readonly AU002 = new CoreErrorCode('AU002');
  static readonly AU003 = new CoreErrorCode('AU003');
  static readonly AU004 = new CoreErrorCode('AU004');
  static readonly AU005 = new CoreErrorCode('AU005');
  static readonly AU006 = new CoreErrorCode('AU006');
  static readonly AU100 = new CoreErrorCode('AU100');
  static readonly AU101 = new CoreErrorCode('AU101');
  static readonly AU200 = new CoreErrorCode('AU200');
  static readonly AU201 = new CoreErrorCode('AU201');
  static readonly AU300 = new CoreErrorCode('AU300');
  static readonly AU301 = new CoreErrorCode('AU301');
  static readonly AU400 = new CoreErrorCode('AU400');
  static readonly AU401 = new CoreErrorCode('AU401');

  static readonly F100 = new CoreErrorCode('F100');
  static readonly F101 = new CoreErrorCode('F101');

  static readonly U100 = new CoreErrorCode('U100');

  static readonly P100 = new CoreErrorCode('P100');

  static readonly PS100 = new CoreErrorCode('PS100');

  static readonly PK100 = new CoreErrorCode('PK100');

  static readonly PV100 = new CoreErrorCode('PV100');

  private constructor(readonly _code: string) {
    super();
  }

  get code(): string {
    return this._code;
  }
}
