import urlJoin from "url-join";

/**
 * @eonduck2 24.10.30
 * @description 경로 및 엔드 포인트를 조합하는 모듈입니다.
 *
 * @param { ...string } paths 조합할 url 경로 및 엔드 포인트
 * @returns { string } 조합된 경로
 *
 */
export default (...paths: string[]): string => urlJoin(...paths);

