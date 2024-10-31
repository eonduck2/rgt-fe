import type TOrderStatus from "@/types/component/dashboard/order/orderStatus.type";

/**
 * @eonduck2 24.10.31
 * @description 주문 순서대로의 정ㄹ렬을 위해 주어진 주문 상태에 따라 우선순위를 반환하는 모듈
 *
 * @param { TOrderStatus } status 현재 주문 상태
 * @returns { number } 주문 상태에 따른 우선순위
 *
 */
export default (status: TOrderStatus): number => {
  switch (status) {
    case "접수됨":
      return 1;
    case "처리중":
      return 2;
    case "완료":
      return 3;
    default:
      return 0;
  }
};

