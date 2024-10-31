import type THttpMethod from "@/types/http/httpMethod.type";

/**
 * @eonduck2 24.10.30
 * @description http Method 들에 대한 그룹 상수 정의입니다.
 */
const HttpMethod: Record<string, THttpMethod> = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
  HEAD: "HEAD",
};

export default HttpMethod;

