/**
 * @eonduck2 24.10.30
 * @description Http Method 들에 대한 타입 정의입니다.
 *
 * @typedef { THttpMethod }
 */

type THttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "HEAD"
  | "DELETE"
  | "OPTIONS";

export default THttpMethod;

