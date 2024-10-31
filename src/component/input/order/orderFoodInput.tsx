import type TOrderFoodInputProps from "@/types/component/input/orderFoodInputProps.type";
import React from "react";

/**
 * @eonduck2 24.10.29
 * @description 사용자가 수량을 입력할 수 있는 입력 필드 컴포넌트입니다.
 * @param { string } props.foodName - 주문 음식의 이름을 나타내는 값입니다.
 * @param { (value: string) => void } props.stateSetter - 수량 상태를 업데이트하는 함수입니다.
 * @param { string } props.labelContent - 입력 필드의 레이블 내용을 나타내는 문자열입니다.
 * @returns { JSX.Element } 입력 필드와 레이블을 포함하는 JSX 요소입니다.
 */

const OrderFoodInput: React.FC<TOrderFoodInputProps> = ({
  foodName,
  stateSetter,
  labelContent,
}) => {
  return (
    <>
      <label
        htmlFor="foodName"
        className="block mb-2 text-sm font-semibold text-gray-700"
      >
        {labelContent}
      </label>
      <input
        type="text"
        id="foodName"
        value={foodName}
        onChange={(e) => stateSetter(e.target.value)}
        required
        placeholder="예: 김치찌개"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
      />
    </>
  );
};

export default OrderFoodInput;

