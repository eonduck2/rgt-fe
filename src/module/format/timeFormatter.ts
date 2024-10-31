/**
 * @eonduck2 24.10.31
 * @description 주어진 시간대를 포맷팅해주는 모듈
 *
 * @param { string } timestamp 표준 시간대의 타임 스탬프
 * @returns { string } 24시간 기준으로 포맷팅된 시간
 *
 */
export default (timestamp: string): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

