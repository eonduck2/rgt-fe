import type TValue from "@/types/shared/value.type";

/**
 * @eonduck2 24.10.31
 * @description 검색어 인풋창 속성에 대한 형식
 *
 * @typedef { Object } TSearchBarProps
 * @property { string } value 검색어
 * @property { (value: string) => void } setter 검색어 세터
 */
type TSearchBarProps = {
  value: TValue;
  setter: (value: string) => void;
};
export default TSearchBarProps;

