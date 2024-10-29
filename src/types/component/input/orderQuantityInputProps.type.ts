import TLabelContent from "@/types/shared/labelContent.type";
import TQuantity from "@/types/shared/quantity.type";

/**
 * @eonduck2 24.10.29
 * @typedef { Object } TOrderQuantityInputProps
 * @description 수량 인풋의 property들을 정의한 형식입니다.
 * @property { TQuantity } quantity 주문할 수량을 나타내는 값입니다.
 * @property { (value: number) => void } stateSetter 수량 상태를 업데이트하는 함수입니다.
 * @property { TLabelContent } labelContent 입력 필드의 레이블 내용을 나타내는 문자열입니다.
 */
type TOrderQuantityInputProps = {
  quantity: TQuantity;
  stateSetter: (value: number) => void; // 상태를 업데이트하는 함수 타입으로 정의
  labelContent: TLabelContent;
};

export default TOrderQuantityInputProps;

