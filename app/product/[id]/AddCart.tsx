'use client';

import useCartStore from '@/store';
import { AddCartType } from '@/types';

const AddCart = ({ id, name, image, quantity, unit_amount }: AddCartType) => {
  const { addProduct } = useCartStore();
  return (
    <>
      <button
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
        onClick={() =>
          addProduct({
            id,
            name,
            image,
            quantity,
            unit_amount,
          })
        }
      >
        Add to cart
      </button>
    </>
  );
};

export default AddCart;
