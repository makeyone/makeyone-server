import { Enum, EnumType } from 'ts-jenum';

import { CoreErrorCode } from '@src/core-api/support/error/CoreErrorCode';

@Enum('code')
export class CoreErrorType extends EnumType<CoreErrorType>() {
  static readonly DEFAULT_ERROR = new CoreErrorType(CoreErrorCode.E500.code, '서버에러가 발생하였습니다.');
  static readonly DEFAULT_BAD_REQUEST_ERROR = new CoreErrorType(CoreErrorCode.E400.code, '잘못된 요청입니다.');
  static readonly DEFAULT_NOT_FOUND = new CoreErrorType(CoreErrorCode.E404.code, '존재하지 않는 경로입니다.');
  static readonly PAYLOAD_TOO_LARGE = new CoreErrorType(
    CoreErrorCode.E413.code,
    '요청하신 파일의 사이즈가 너무 큽니다.',
  );

  static readonly INVALID_JWT_ACCESS_TOKEN = new CoreErrorType(CoreErrorCode.J100.code, '유효하지 않는 토큰입니다.');
  static readonly EXPIRED_JWT_ACCESS_TOKEN = new CoreErrorType(CoreErrorCode.J101.code, '만료된 토큰입니다.');
  static readonly INVALID_JWT_REFRESH_TOKEN = new CoreErrorType(CoreErrorCode.J102.code, '유효하지 않는 토큰입니다.');
  static readonly EXPIRED_JWT_REFRESH_TOKEN = new CoreErrorType(CoreErrorCode.J103.code, '만료된 토큰입니다.');

  static readonly NOT_LOGGED_IN = new CoreErrorType(CoreErrorCode.AU001.code, '로그인이 되어있지 않습니다.');
  static readonly NON_EXISTENT_USER = new CoreErrorType(CoreErrorCode.AU002.code, '존재하지 않는 유저입니다.');
  static readonly NOT_ACTIVED_USER = new CoreErrorType(CoreErrorCode.AU003.code, '활성화 되지 않은 유저입니다.');
  static readonly DO_NOT_HAVE_PERMISSION = new CoreErrorType(CoreErrorCode.AU004.code, '접근 권한이 없습니다.');
  static readonly DIFFERENT_SOCIAL_PROVIDER = new CoreErrorType(
    CoreErrorCode.AU005.code,
    '다른 소셜로 회원가입이 되어있습니다.',
  );
  static readonly USER_TOKEN_NOT_FOUND = new CoreErrorType(
    CoreErrorCode.AU006.code,
    '유저의 토큰이 존재하지 않습니다.',
  );
  static readonly GET_DISCORD_USER_PROFILE_AUTH_ERROR = new CoreErrorType(
    CoreErrorCode.AU100.code,
    '디스코드 프로필 조회 인증 에러',
  );
  static readonly GET_DISCORD_USER_PROFILE_SERVER_ERROR = new CoreErrorType(
    CoreErrorCode.AU101.code,
    '디스코드 프로필 조회 서버 에러',
  );
  static readonly GET_GOOGLE_USER_PROFILE_AUTH_ERROR = new CoreErrorType(
    CoreErrorCode.AU200.code,
    '구글 프로필 조회 인증 에러',
  );
  static readonly GET_GOOGLE_USER_PROFILE_SERVER_ERROR = new CoreErrorType(
    CoreErrorCode.AU201.code,
    '구글 프로필 조회 서버 에러',
  );
  static readonly GET_NAVER_USER_PROFILE_AUTH_ERROR = new CoreErrorType(
    CoreErrorCode.AU300.code,
    '네이버 프로필 조회 서버 에러',
  );
  static readonly GET_NAVER_USER_PROFILE_SERVER_ERROR = new CoreErrorType(
    CoreErrorCode.AU301.code,
    '네이버 프로필 조회 인증 에러',
  );
  static readonly GET_KAKAO_USER_PROFILE_AUTH_ERROR = new CoreErrorType(
    CoreErrorCode.AU400.code,
    '카카오 프로필 조회 서버 에러',
  );
  static readonly GET_KAKAO_USER_PROFILE_SERVER_ERROR = new CoreErrorType(
    CoreErrorCode.AU401.code,
    '카카오 프로필 조회 인증 에러',
  );

  static readonly UNSUPPORTED_FILE_FORMAT = new CoreErrorType(
    CoreErrorCode.F100.code,
    '지원하지 않는 파일 확장자입니다.',
  );
  static readonly FILE_NOT_FOUND = new CoreErrorType(CoreErrorCode.F101.code, '업로드된 파일이 없습니다.');

  static readonly USER_NOT_FOUND = new CoreErrorType(CoreErrorCode.U100.code, '존재하지 않는 유저입니다.');

  static readonly POST_NOT_FOUND = new CoreErrorType(CoreErrorCode.P100.code, '존재하지 않는 게시글입니다.');

  static readonly SWITCH_NOT_FOUND = new CoreErrorType(CoreErrorCode.PS100.code, '존재하지 않는 스위치입니다.');

  static readonly KEYCAP_NOT_FOUND = new CoreErrorType(CoreErrorCode.PK100.code, '존재하지 않는 키캡입니다.');

  static readonly INVALID_YOUTUBE_VIDEO_URL = new CoreErrorType(
    CoreErrorCode.PV100.code,
    '유효하지 않은 유튜브 영상의 URL입니다.',
  );

  private constructor(readonly _code: string, readonly _message: string) {
    super();
  }

  get code(): string {
    return this._code;
  }

  get message(): string {
    return this._message;
  }
}
