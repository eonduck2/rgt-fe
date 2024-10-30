import urlJoiner from "@/module/url/urlJoiner";

describe("urlJoiner", () => {
  it("두 개의 간단한 경로를 조합합니다.", () => {
    const result = urlJoiner("https://test.com", "testPath");
    expect(result).toBe("https://test.com/testPath");
  });

  it("여러 개의 경로를 조합합니다.", () => {
    const result = urlJoiner(
      "https://test.com",
      "testPath",
      "testPath2",
      "testPath3"
    );
    expect(result).toBe("https://test.com/testPath/testPath2/testPath3");
  });

  it("여러 개의 경로를 슬래시와 함께 조합합니다.", () => {
    const result = urlJoiner(
      "https://test.com/",
      "/testPath/",
      "/testPath2/",
      "/testPath3"
    );
    expect(result).toBe("https://test.com/testPath/testPath2/testPath3");
  });

  it("끝에 슬래시를 포함한 경로를 조합합니다.", () => {
    const result = urlJoiner(
      "https://test.com/",
      "testPath/testPath2/testPath3/"
    );
    expect(result).toBe("https://test.com/testPath/testPath2/testPath3/");
  });

  it("빈 문자열을 포함하여 경로를 조합합니다.", () => {
    const result = urlJoiner("https://test.com", "", "testPath");
    expect(result).toBe("https://test.com/testPath");
  });

  it("프로토콜 없이 경로를 조합합니다.", () => {
    const result = urlJoiner("test.com", "testPath");
    expect(result).toBe("test.com/testPath");
  });
});

