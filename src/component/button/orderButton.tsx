/**
 * @eonduck2 24.10.29
 * @description 사용자의 주문을 제출하기위해 사용되는 버튼입니다.
 * @param NoParam
 * @returns { JSX.Element } 주문하기 버튼을 포함한 JSX 요소
 */

export default () => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      주문하기
    </button>
  );
};

