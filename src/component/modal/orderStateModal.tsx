import mouseEventCutter from "@/module/event/mouseEventCutter";
import TOrderStateModalProps from "@/types/component/modal/orderStateModalProps.type";
import React from "react";

/**
 * @eonduck2 24.10.31
 * @description 주문 상태를 알려주는 모달창
 * @param { TOrderStateModalProps } props 메시지와 onClose 함수를 포함한 모달 속성
 * @returns { React.FC } React 함수형 컴포넌트
 */
const OrderStateModal: React.FC<TOrderStateModalProps> = ({
  message,
  onClose,
}) => {
  /**
   * @eonduck2 24.10.31
   * @description 모달 배경 클릭 시, 모달을 닫는 기능
   */
  const backgroundClickModalClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={backgroundClickModalClose}
    >
      <div className="bg-white rounded-lg p-6" onClick={mouseEventCutter}>
        <h2 className="text-lg font-bold">{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default OrderStateModal;

