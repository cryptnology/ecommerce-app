import { AddCartType } from '@/types';

const calculateOrderAmount = (items: AddCartType[]) => {
  return items.reduce(
    (acc, item) => acc + item.unit_amount! * item.quantity,
    0,
  );
};

export default calculateOrderAmount;
