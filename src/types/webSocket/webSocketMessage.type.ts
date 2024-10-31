import type TOrder from "../component/dashboard/order/order.type";
import type TOrderStatus from "../component/dashboard/order/orderStatus.type";

/**
 * @eonduck2 24.10.31
 * @description 웹 소켓 수신 메시지에 대한 형식
 *
 * @typedef { Object } TWebSocketMessage
 * @property { string } type 주문의 상태 (새로운 주문, 상태 업데이트 )
 * @property { TOrder[] } [orders] 이전 주문들
 * @property { TOrder } [order] 단일 주문
 * @property { number } [order_id] 주문 번호
 * @property { TOrderStatus } [status] 주문 상태( 처리중, 완료 )
 */
type TWebSocketMessage = {
  type: "orders_list" | "new_order" | "status_update";
  orders?: TOrder[];
  order?: TOrder;
  order_id?: number;
  status?: TOrderStatus;
};

export default TWebSocketMessage;

