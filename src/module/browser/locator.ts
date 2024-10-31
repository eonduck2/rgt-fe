/**
 * @eonduck2 24.10.31
 * @description 주어진 경로의 브라우저로 이동하는 모듈
 *
 * @param { string } path 이동할 url
 * @returns { string } 해당 경로의 브라우저로 이동
 *
 */
export default (path: string) => (window.location.href = path);

