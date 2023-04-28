import AddCartType from './AddCartType';

type CartStoreType = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
};

export default CartStoreType;
