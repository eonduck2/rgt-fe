import TOrder from "./order.type";

/**
 * @eonduck2 24.10.31
 * @description 주문 상태 설정 형식
 *
 * @typedef { React.Dispatch<React.SetStateAction<TOrder[]>> }
 */
type TOrdersSetter = React.Dispatch<React.SetStateAction<TOrder[]>>;

export default TOrdersSetter;

