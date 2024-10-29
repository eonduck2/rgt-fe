import TOrderQuantityInputProps from "@/types/component/input/orderInputProps.type";
import React from "react";

/**
 * @eonduck2 24.10.29
 * @description 사용자가 수량을 입력할 수 있는 입력 필드 컴포넌트입니다.
 * @param { TQuantity } props.quantity - 주문할 수량을 나타내는 값입니다.
 * @param { (value: number) => void } props.stateSetter - 수량 상태를 업데이트하는 함수입니다.
 * @param { string } props.labelContent - 입력 필드의 레이블 내용을 나타내는 문자열입니다.
 * @returns { JSX.Element } 입력 필드와 레이블을 포함하는 JSX 요소입니다.
 */

const OrderInput: React.FC<TOrderQuantityInputProps> = ({
  quantity,
  stateSetter,
  labelContent,
}) => {
  return (
    <>
      <label
        htmlFor="quantity"
        className="block mb-2 text-sm font-semibold text-gray-700"
      >
        {labelContent}
      </label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => stateSetter(Math.max(1, Number(e.target.value)))}
        min="1"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
      />
    </>
  );
};

export default OrderInput;

