/**
 * 이미지 호스트.
 *
 * 기본은 API 서버와 같은 곳이다 — 게이트웨이가 `/images/` 를 저장소(MinIO·S3)로
 * 넘겨 주고 있어 API 도메인에서 그대로 받아올 수 있다.
 * 나중에 CDN 이 따로 붙으면 VITE_IMAGE_BASE_URL 로 갈라 놓으면 된다.
 */
const IMAGE_BASE = (
  import.meta.env.VITE_IMAGE_BASE_URL ||
  import.meta.env.VITE_SERVER_URL ||
  ''
).replace(/\/$/, '');

/** `https://…`, `//…`, `data:…` 처럼 이미 스스로 완결된 주소인가. */
const isAbsolute = (src: string): boolean =>
  /^(https?:)?\/\//i.test(src) || src.startsWith('data:');

/**
 * 이미지 주소를 브라우저가 실제로 받아올 수 있는 주소로 바꾼다.
 *
 * DB 에는 `/images/mfds/33/main.webp` 같은 상대경로가 들어간다. 저장소를 MinIO 에서
 * S3 로 갈아도 DB 는 그대로 두려는 의도라, 주소를 완성하는 몫은 읽는 쪽에 있다.
 *
 * 그런데 상대경로는 <b>보고 있는 페이지의</b> 호스트에서 찾는다. 운영에서 화면은
 * Amplify 에, 이미지는 api 도메인 뒤 게이트웨이에 있어 서로 다른 오리진이다.
 * 그대로 두면 이미지 요청이 화면 호스트로 가서 전부 실패한다.
 *
 * 게이트웨이 뒤에서 한 오리진으로 서빙될 때는 base 가 비어 있고, 그때는 상대경로가
 * 이미 맞는 주소이므로 손대지 않는다.
 */
export const toImageUrl = (src?: string | null): string | null => {
  if (!src) return null;
  if (isAbsolute(src) || !IMAGE_BASE) return src;
  return `${IMAGE_BASE}/${src.replace(/^\//, '')}`;
};
