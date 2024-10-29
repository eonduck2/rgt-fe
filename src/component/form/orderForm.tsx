import { useState } from "react";
import OrderButton from "../button/orderButton";
import OrderFoodInput from "../input/order/orderFoodInput";
import OrderQuantityInput from "../input/order/orderQuantityInput";

export default () => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ foodName, quantity });
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

