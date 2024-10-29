import TQuantity from "@/types/shared/quantity.type";

type TOrderInputProps = {
  quantity: TQuantity;
  stateSetter: (value: number) => void;
  labelContent: string;
};

export default TOrderInputProps;
