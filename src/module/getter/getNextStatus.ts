import TOrderStatus from "@/types/component/dashboard/order/orderStatus.type";

/**
 * @eonduck2 24.10.31
 * @description 주어진 주문 상태를 업데이트하는 모듈 (상태의 흐름에 따라)
 *
 * @param { TOrderStatus } currentStatus 현재 주문 상태
 * @returns { TOrderStatus } 업데이트된 주문 상태
 *
 */
export default (currentStatus: TOrderStatus): TOrderStatus => {
  switch (currentStatus) {
    case "접수됨":
      return "처리중";
    case "처리중":
      return "완료";
    case "완료":
      return "완료";
    default:
      return currentStatus;
  }
};

