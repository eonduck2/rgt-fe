import thrower from "@/module/throw/thrower";
import fetcher from "@/module/fetching/fetcher";
import { failedFetchMessage } from "@/static/module/fetching/fetcher.static";

// thrower 모듈 모킹
jest.mock("@/module/throw/thrower", () =>
  jest.fn((message: string) => {
    throw new Error(message);
  })
);

// fetch 함수 모킹
global.fetch = jest.fn();

describe("mocking 데이터를 활용한 fetcher 테스트 케이스 집합입니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("성공적인 fetch 요청 시 응답을 반환해야 합니다", async () => {
    const mockResponse = { ok: true };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const response = await fetcher("test-url");

    // response가 mock된 response(true)와 동일하고, thrower가 호출되지 않았는지 확인합니다.
    expect(response).toBe(mockResponse);
    expect(thrower).not.toHaveBeenCalled();
  });

  it("fetch 요청 실패 시 에러를 throw 해야 합니다", async () => {
    const mockResponse = { ok: false };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    // fetcher 함수가 에러를 던지고, thrower가 실패 메시지와 함께 호출되었는지 확인합니다.
    await expect(fetcher("test-url")).rejects.toThrow();
    expect(thrower).toHaveBeenCalledWith("test-url" + failedFetchMessage);
  });
});

