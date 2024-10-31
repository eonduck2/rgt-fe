import { Dispatch, SetStateAction } from "react";
import type TSortDirection from "./sort/sortDirection.type";
import type TSortField from "./sort/sortField.type";

/**
 * @eonduck2 24.10.31
 * @description 대시보드 내에 헤더가 갖고있는 컨텐츠들의 일반화 형식
 *
 * @typedef { Object } TDashboardHeaderProps
 * @property { { field: TSortField; direction: TSortDirection } } sortConfig 정렬 초기화 속성
 * @property { Dispatch<SetStateAction<{ field: TSortField; direction: TSortDirection } } setSortConfig 정렬 초기화 세터
 */

type TDashboardHeaderProps = {
  sortConfig: { field: TSortField; direction: TSortDirection };
  setSortConfig: Dispatch<
    SetStateAction<{ field: TSortField; direction: TSortDirection }>
  >;
};

export default TDashboardHeaderProps;

