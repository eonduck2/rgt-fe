import { useRouter } from "next/router";

/**
 * @eonduck2 24.10.31
 * @description 예외 처리 페이지입니다.
 * @returns { JSX.Element }
 */
export default () => {
  const router = useRouter();

  const toHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">페이지를 찾지 못했습니다.</h1>
      <button
        onClick={toHome}
        className="bg-purple-600 text-white text-lg font-bold py-2 px-4 rounded hover:bg-purple-500 transition-colors duration-200"
      >
        홈으로
      </button>
    </div>
  );
};

