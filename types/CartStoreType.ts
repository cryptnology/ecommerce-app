import AddCartType from './AddCartType';

type CartStoreType = {
  isOpen: boolean;
  cart: AddCartType[];
  paymentIntent: string;
  onCheckout: string;
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  setPaymentIntent: (val: string) => void;
  setOnCheckout: (val: string) => void;
};

export default CartStoreType;
