import React, { useState, useEffect } from "react";
import { Home, Search } from "lucide-react";

interface Order {
  order_id: number;
  item: string;
  quantity: number;
  status: OrderStatus;
  timestamp: string;
}

type OrderStatus = "접수됨" | "처리중" | "완료";
type SortDirection = "asc" | "desc";
type SortField = "order_id" | "status";

interface WebSocketMessage {
  type: "orders_list" | "new_order" | "status_update";
  orders?: Order[];
  order?: Order;
  order_id?: number;
  status?: OrderStatus;
}

const OrderDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({
    field: "order_id",
    direction: "asc",
  });

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => {
      console.log("웹소켓 연결됨");
      setWs(websocket);
    };

    websocket.onmessage = (event: MessageEvent) => {
      const data: WebSocketMessage = JSON.parse(event.data);

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
                    status: data.status as OrderStatus,
                  };
                }
                return order;
              })
            );
          }
          break;
      }
    };

    websocket.onclose = () => {
      console.log("웹소켓 연결 종료");
      setWs(null);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const getStatusClass = (status: OrderStatus): string => {
    switch (status) {
      case "접수됨":
        return "bg-blue-100 text-blue-800";
      case "처리중":
        return "bg-yellow-100 text-yellow-800";
      case "완료":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    switch (currentStatus) {
      case "접수됨":
        return "처리중";
      case "처리중":
        return "완료";
      case "완료":
        return "완료";
      default:
        return currentStatus;
    }
  };

  const handleStatusChange = (orderId: number, currentStatus: OrderStatus) => {
    const nextStatus = getNextStatus(currentStatus);

    if (ws && ws.readyState === WebSocket.OPEN && currentStatus !== "완료") {
      ws.send(
        JSON.stringify({
          type: "status_update",
          order_id: orderId,
          status: nextStatus,
        })
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.order_id === orderId ? { ...order, status: nextStatus } : order
        )
      );
    }
  };

  const handleSort = (field: SortField) => {
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

  const getStatusWeight = (status: OrderStatus): number => {
    switch (status) {
      case "접수됨":
        return 1;
      case "처리중":
        return 2;
      case "완료":
        return 3;
      default:
        return 0;
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.field === "order_id") {
      const compareValue = a.order_id - b.order_id;
      return sortConfig.direction === "asc" ? compareValue : -compareValue;
    } else {
      const compareValue =
        getStatusWeight(a.status) - getStatusWeight(b.status);
      return sortConfig.direction === "asc" ? compareValue : -compareValue;
    }
  });

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-lg">
      <div className="flex-none p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleHomeClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
          >
            <Home className="w-6 h-6 text-gray-600" />
          </button>
          <div className="relative flex-1 max-w-md mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="메뉴 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <header className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            실시간 주문 현황
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2">
            총 {filteredOrders.length}개의 주문이 있습니다
          </p>
        </header>

        <div className="grid grid-cols-6 gap-4 sm:gap-6 font-bold bg-gray-50 p-4 sm:p-6 rounded-lg text-base sm:text-lg">
          <div
            className="text-gray-700 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("order_id")}
          >
            주문번호
            <span className="text-gray-500">{getSortIcon("order_id")}</span>
          </div>
          <div className="text-gray-700">메뉴</div>
          <div className="text-gray-700">수량</div>
          <div
            className="text-gray-700 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("status")}
          >
            상태
            <span className="text-gray-500">{getSortIcon("status")}</span>
          </div>
          <div className="text-gray-700">시간</div>
          <div className="text-gray-700">상태 변경</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="min-w-full">
          <div className="divide-y divide-gray-200">
            {sortedOrders.map((order) => (
              <div
                key={order.order_id}
                className="grid grid-cols-6 gap-4 sm:gap-6 p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
              >
                <div className="font-medium text-gray-900 text-sm sm:text-base md:text-lg">
                  #{order.order_id}
                </div>
                <div className="text-gray-800 text-sm sm:text-base md:text-lg">
                  {order.item}
                </div>
                <div className="text-gray-800 text-sm sm:text-base md:text-lg">
                  {order.quantity}
                </div>
                <div>
                  <span
                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-gray-600 text-sm sm:text-base md:text-lg">
                  {formatTime(order.timestamp)}
                </div>
                <div>
                  {order.status !== "완료" && (
                    <button
                      onClick={() =>
                        handleStatusChange(order.order_id, order.status)
                      }
                      className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg ${
                        order.status === "접수됨"
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      } transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={!ws || ws.readyState !== WebSocket.OPEN}
                    >
                      {order.status === "접수됨" ? "조리 시작" : "완료 처리"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {sortedOrders.length === 0 && (
            <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20 text-gray-500 text-base sm:text-lg md:text-xl">
              {searchTerm ? "검색 결과가 없습니다" : "현재 주문이 없습니다"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full h-full md:w-11/12 md:h-5/6 lg:w-10/12 xl:w-10/12 2xl:w-9/12">
        <OrderDashboard />
      </div>
    </div>
  );
};

export default OrderPage;

