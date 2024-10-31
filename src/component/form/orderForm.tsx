import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import OrderButton from "../button/orderButton";
import OrderFoodInput from "../input/order/orderFoodInput";
import OrderQuantityInput from "../input/order/orderQuantityInput";
import fetcher from "@/module/fetching/fetcher";
import mime from "mime";
import HttpMethod from "@/static/shared/http/httpMethod.static";
import urlJoiner from "@/module/url/urlJoiner";
import { LayoutGrid } from "lucide-react";
import OrderStateModal from "../modal/orderStateModal";
import { forwardSlash } from "@/static/shared/symbol/symbol.static";
import routePusher from "@/module/routing/routePusher";

/**
 * @eonduck2 24.10.31
 * @description 주문을 위한 폼 컴포넌트
 * @returns { JSX.Element } 주문 폼 및 모달 컴포넌트
 */
export default () => {
  const router = useRouter();
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const BE_URL = process.env.NEXT_PUBLIC_BE_URL as string;
  const EP_ORDER = process.env.NEXT_PUBLIC_EP_ORDER as string;
  const EP_DASHBOARD = process.env.NEXT_PUBLIC_EP_DASHBOARD as string;

  const memoizedFoodName = useMemo(() => foodName, [foodName]);

  const memoizedQuantity = useMemo(() => quantity, [quantity]);

  const orderData = useMemo(
    () => ({
      item: memoizedFoodName,
      quantity: memoizedQuantity,
    }),
    [memoizedFoodName, memoizedQuantity]
  );

  /**
   * @eonduck2 24.10.31
   * @description 주문 내역이 제출될 때 실행되는 함수로서, 주문 정보를 본문에 실어 백엔드에 요청하고 반환 결과(주문 성공/실패)를 모달로 띄워줍니다.
   *
   * @param { React.MouseEvent } e 폼 요소 이벤트 객체
   */
  const toServerForReq = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetcher(urlJoiner(BE_URL, EP_ORDER), {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": mime.getType("json") as string,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    setConfirmationMessage(data.message);
    setIsModalOpen(true);
  };

  /**
   * @eonduck2 24.10.31
   * @description Next Router를 이용한 경로 이동 기능
   *
   */
  const toDashboard = () => {
    router.push(urlJoiner(forwardSlash, EP_DASHBOARD));
  };

  return (
    <div className="relative w-1/3 mx-auto">
      <button
        onClick={toDashboard}
        className="absolute top-4 left-0 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-sm font-medium">대시보드</span>
      </button>

      <form
        onSubmit={toServerForReq}
        className="w-full p-6 bg-white rounded-lg shadow-lg mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          주문하기
        </h2>

        <div className="mb-6">
          <OrderFoodInput
            foodName={memoizedFoodName}
            stateSetter={setFoodName}
            labelContent="음식 이름"
          />
        </div>

        <div className="mb-8">
          <OrderQuantityInput
            quantity={memoizedQuantity}
            stateSetter={setQuantity}
            labelContent="수량"
          />
        </div>

        <OrderButton />
      </form>

      {isModalOpen && (
        <OrderStateModal
          message={confirmationMessage}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

