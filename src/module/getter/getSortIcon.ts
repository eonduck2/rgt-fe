import type TSortDirection from "@/types/component/dashboard/sort/sortDirection.type";
import type TSortField from "@/types/component/dashboard/sort/sortField.type";

/**
 * @eonduck2 24.10.31
 * @description 주어진 정렬 방식(오름차/내림차)에 따라 정렬 아이콘을 반환하는 모듈
 *
 * @param { { field: TSortField; direction: TSortDirection } } sortConfig 현재 정렬 설정
 * @param { TSortField } field 비교할 필드
 * @returns { string } 정렬 상태에 따라 반환되는 아이콘
 *
 */
export default (
  sortConfig: { field: TSortField; direction: TSortDirection },
  field: TSortField
) => {
  if (sortConfig.field !== field) return "↕";
  return sortConfig.direction === "asc" ? "↑" : "↓";
};

