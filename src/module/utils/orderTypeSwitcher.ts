import TOrdersSetter from "@/types/component/dashboard/order/orderSetter.type";
import type TOrderStatus from "@/types/component/dashboard/order/orderStatus.type";
import type TWebSocketMessage from "@/types/webSocket/webSocketMessage.type";

/**
 * @eonduck2 24.10.31
 * @description WebSocket 서버로부터 수신된 주문 타입에 따라 주문 상태를 업데이트 해주는 기능
 *
 * @param { TWebSocketMessage } data 서버로부터 수신된 메시지
 * @param { OrdersSetter } setOrders 주문 상태를 업데이트하는 함수
 */
export default (data: TWebSocketMessage, setOrders: TOrdersSetter): void => {
  switch (data.type) {
    case "orders_list":
      if (data.orders) {
        setOrders(data.orders);
      }
      break;
    case "new_order":
      if (data.order) {
        setOrders((prev) => [...prev, data.order!]);
      }
      break;
    case "status_update":
      if (data.order_id && data.status) {
        setOrders((prev) =>
          prev.map((order) => {
            if (order.order_id === data.order_id) {
              return {
                ...order,
                status: data.status as TOrderStatus,
              };
            }
            return order;
          })
        );
      }
      break;
  }
};

