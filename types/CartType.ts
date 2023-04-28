type CartItem = {
  name: string;
  id: string;
  images?: string[];
  description?: string;
  unit_amount: number;
  quantity: number;
};

type CartType = {
  isOpen: boolean;
  cart: CartItem[];
};

export default CartType;
