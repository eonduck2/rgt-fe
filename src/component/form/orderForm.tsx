import { useState } from "react";
import OrderButton from "../button/orderButton";
import OrderFoodInput from "../input/order/orderFoodInput";
import OrderQuantityInput from "../input/order/orderQuantityInput";
import fetcher from "@/module/fetching/fetcher";
import thrower from "@/module/throw/thrower";
import mime from "mime";
import HttpMethod from "@/static/shared/http/httpMethod.static";
import urlJoiner from "@/module/url/urlJoiner";

export default () => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const BE_URL = process.env.NEXT_PUBLIC_BE_URL as string;
  const EP_ORDER = process.env.NEXT_PUBLIC_EP_ORDER as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = { foodName, quantity };

    try {
      const response = await fetcher(urlJoiner(BE_URL, EP_ORDER), {
        method: HttpMethod.POST,
        headers: {
          "Content-Type": mime.getType("json") as string,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      thrower(error as Error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        주문하기
      </h2>

      <div className="mb-6">
        <OrderFoodInput
          foodName={foodName}
          stateSetter={setFoodName}
          labelContent="음식 이름"
        />
      </div>

      <div className="mb-8">
        <OrderQuantityInput
          quantity={quantity}
          stateSetter={setQuantity}
          labelContent="수량"
        />
      </div>

      <OrderButton />
    </form>
  );
};

