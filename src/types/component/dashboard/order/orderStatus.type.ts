/**
 * @eonduck2 24.10.31
 * @description 주문 상태 형식
 *
 * @typedef { (orders: TOrder[]) => TOrder[]}
 */

type TOrderStatus = "접수됨" | "처리중" | "완료";

export default TOrderStatus;

