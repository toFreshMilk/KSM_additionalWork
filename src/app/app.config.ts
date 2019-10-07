// 개발시에는 true
export const isDev = true;

// 회원사의 경우 true
export const isMember = false;

// App 버전
export const APP_VERSION = '1.4.6';

export const getContextUrl = () => {
  // 개발중일 경우
  if (isDev) return 'https://t-ksm.krx.co.kr';
  // 회원사의 경우
  if (isMember) return 'https://m-ksm.krx.co.kr';

  return 'https://ksm.krx.co.kr';
};
