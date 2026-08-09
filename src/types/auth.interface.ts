/** 기기 인증 요청 — 앱이 기기별로 생성/보관하는 deviceId 로 로그인한다. */
export interface DeviceAuthRequest {
  /** 기기 식별자 (191자 이내). 같은 값이면 항상 같은 유저. */
  deviceId: string;
  /** 계정을 처음 만들 때만 반영되는 표시 이름. */
  userName?: string;
}

/** 기기 인증 응답 — 토큰과 유저 정보를 함께 내려준다. */
export interface DeviceAuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  userId: string;
  userName: string;
  /** 이번 요청으로 계정이 새로 만들어졌는지 여부. */
  newUser: boolean;
}

/** 브라우저에 보관하는 인증 세션. */
export interface AuthSession {
  accessToken: string;
  userId: string;
  userName: string;
  /** 만료 시각(epoch ms). */
  expiresAt: number;
}
