import { failedFetchMessage } from "@/static/module/fetching/fetcher.static";
import thrower from "../throw/thrower";

/**
 * @eonduck2 24.10.29
 * @description fetch 요청을 보내는 기능
 *
 * @param { string } url 요청을 보낼 url
 * @param { RequestInit } [options] Method나 header, body 같은 추가적인 요청 옵션
 * @throws { Error } 주어진 메시지를 포함한 Error 객체
 * @returns { Promise<Response> } fetch 요청의 응답을 포함하는 Promise 객체
 */
export default async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  try {
    const response = await fetch(url, { ...options });

    if (!response.ok) {
      window.location.href = "/error";
      thrower(url + failedFetchMessage);
    }

    return response;
  } catch (error) {
    window.location.href = "/error";
    throw error;
  }
};

