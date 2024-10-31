import type TValue from "@/types/shared/value.type";

/**
 * @eonduck2 24.10.31
 * @description 수량 인풋의 property들을 정의한 형식입니다.
 *
 * @typedef { Object } TSearchBarProps
 * @property { string } value 주문할 수량을 나타내는 값입니다.
 * @property { (value: string) => void } setter 수량 상태를 업데이트하는 함수입니다.
 */
type TSearchBarProps = {
  value: TValue;
  setter: (value: string) => void;
};
export default TSearchBarProps;

