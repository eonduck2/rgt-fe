import TOrderStatus from "@/types/component/dashboard/order/orderStatus.type";

/**
 * @eonduck2 24.10.31
 * @description 주어진 주문 상태에 따라 스타일 클래스를 반환하는 모듈 (버튼을 바꿔 UX를 확보하기 위함)
 *
 * @param { TOrderStatus } status 현재 주문 상태
 * @returns { string } 주문 상태에 따라 적용할 스타일 클래스
 *
 */
export default (status: TOrderStatus): string => {
  switch (status) {
    case "접수됨":
      return "bg-blue-100 text-blue-800";
    case "처리중":
      return "bg-yellow-100 text-yellow-800";
    case "완료":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

