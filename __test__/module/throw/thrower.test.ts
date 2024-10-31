import thrower from "@/module/throw/thrower";

describe("thrower 함수의 에러 처리 테스트 케이스 집합입니다.", () => {
  it("주어진 메시지와 함께 에러 처리가 돼야합니다.", () => {
    const errorMessage = "테스트 에러 문자열";

    expect(() => thrower(errorMessage)).toThrow(Error);
    expect(() => thrower(errorMessage)).toThrow(errorMessage);
  });

  it("주어진 에러 인스턴스로 에러 처리가 돼야합니다.", () => {
    const errorInstance = new Error("테스트 에러 인스턴스");

    expect(() => thrower(errorInstance)).toThrow(Error);
    expect(() => thrower(errorInstance)).toThrow(errorInstance);
  });

  it("메시지가 주어지지 않으면 빈 오류를 발생시켜야 합니다.", () => {
    expect(() => thrower()).toThrow(Error);
    expect(() => thrower()).toThrow("");
  });
});

