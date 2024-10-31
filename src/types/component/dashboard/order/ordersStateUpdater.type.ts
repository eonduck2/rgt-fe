import TOrder from "./order.type";

/**
 * @eonduck2 24.10.31
 * @description 주문 상태 업데이트 형식
 *
 * @typedef { (orders: TOrder[]) => TOrder[]}
 */
type TOrdersStateUpdater = (orders: TOrder[]) => TOrder[];

export default TOrdersStateUpdater;

