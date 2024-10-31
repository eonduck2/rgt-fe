import React, { useState, useEffect } from "react";
import type TSortField from "@/types/component/dashboard/sort/sortField.type";
import type TOrder from "@/types/component/dashboard/order/order.type";
import type TSortDirection from "@/types/component/dashboard/sort/sortDirection.type";
import type TWebSocketMessage from "@/types/webSocket/webSocketMessage.type";
import type TOrderStatus from "@/types/component/dashboard/order/orderStatus.type";
import type { NextPage } from "next";
import urlJoiner from "@/module/url/urlJoiner";
import orderTypeSwitcher from "@/module/utils/orderTypeSwitcher";
import getOrderStatus from "@/module/getter/getOrderStatus";
import timeFormatter from "@/module/format/timeFormatter";
import getNextStatus from "@/module/getter/getNextStatus";
import getStatusWeight from "@/module/getter/getStatusWeight";
import HomeButton from "../button/homeButton";
import SearchBar from "../input/search/searchBar";
import DashboardHeader from "../header/dashboardHeader";
import fetcher from "@/module/fetching/fetcher";
import HttpMethod from "@/static/shared/http/httpMethod.static";
import thrower from "@/module/throw/thrower";
import mime from "mime";

const OrderDashboard: React.FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    field: TSortField;
    direction: TSortDirection;
  }>({
    field: "order_id",
    direction: "asc",
  });
  const BE_URL = process.env.NEXT_PUBLIC_BE_URL as string;
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL as string;
  const EP_WS = process.env.NEXT_PUBLIC_EP_WS as string;
  const EP_ORDER = process.env.NEXT_PUBLIC_EP_ORDER as string;
  const EP_STATUS = process.env.NEXT_PUBLIC_EP_STATUS as string;

  useEffect(() => {
    const websocket = new WebSocket(urlJoiner(WS_URL, EP_WS));

    websocket.onopen = () => {
      console.log("웹소켓 연결됨");
      setWs(websocket);
    };

    websocket.onmessage = (event: MessageEvent) => {
      const data: TWebSocketMessage = JSON.parse(event.data);
      orderTypeSwitcher(data, setOrders);
    };

    websocket.onclose = () => {
      console.log("웹소켓 연결 종료");
      setWs(null);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const handleStatusChange = async (
    orderId: number,
    currentStatus: TOrderStatus
  ) => {
    const nextStatus = getNextStatus(currentStatus);

    if (currentStatus !== "완료") {
      try {
        await fetcher(urlJoiner(BE_URL, EP_ORDER, String(orderId), EP_STATUS), {
          method: HttpMethod.PUT,
          headers: {
            "Content-Type": mime.getType("json") as string,
          },
          body: JSON.stringify({ status: nextStatus }),
        });
      } catch (error) {
        thrower(error as Error);
      }
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

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-lg">
      <div className="flex-none p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <HomeButton />
          <SearchBar value={searchTerm} setter={setSearchTerm} />
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
          <DashboardHeader
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
          />
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
                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium ${getOrderStatus(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-gray-600 text-sm sm:text-base md:text-lg">
                  {timeFormatter(order.timestamp)}
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

const OrderPage: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full h-full md:w-11/12 md:h-5/6 lg:w-10/12 xl:w-10/12 2xl:w-9/12">
        <OrderDashboard />
      </div>
    </div>
  );
};

export default OrderPage;

