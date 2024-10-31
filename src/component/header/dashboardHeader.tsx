import getSortIcon from "@/module/getter/getSortIcon";
import TSortField from "@/types/component/dashboard/sort/sortField.type";
import TDashboardHeaderProps from "@/types/component/dashboard/dashboardProps.type";

const DashboardHeader: React.FC<TDashboardHeaderProps> = ({
  sortConfig,
  setSortConfig,
}) => {
  const handleSort = (field: TSortField) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field
          ? prev.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  return (
    <>
      <div
        className="text-gray-700 cursor-pointer flex items-center gap-2"
        onClick={() => handleSort("order_id")}
      >
        주문번호
        <span className="text-gray-500">
          {getSortIcon(sortConfig, "order_id")}
        </span>
      </div>
      <div className="text-gray-700">메뉴</div>
      <div className="text-gray-700">수량</div>
      <div
        className="text-gray-700 cursor-pointer flex items-center gap-2"
        onClick={() => handleSort("status")}
      >
        상태
        <span className="text-gray-500">
          {getSortIcon(sortConfig, "status")}
        </span>
      </div>
      <div className="text-gray-700">시간</div>
      <div className="text-gray-700">상태 변경</div>
    </>
  );
};

export default DashboardHeader;

