'use client';

import { useState } from 'react';
import useCartStore from '@/store';
import { AddCartType } from '@/types';

const AddCart = ({ id, name, image, quantity, unit_amount }: AddCartType) => {
  const [added, setAdded] = useState(false);
  const { addProduct } = useCartStore();

  const handleAddToCart = () => {
    addProduct({
      id,
      name,
      image,
      quantity,
      unit_amount,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 500);
  };

  return (
    <button
      className="my-4 btn btn-primary w-full"
      onClick={handleAddToCart}
      disabled={added}
    >
      {added ? 'Adding to cart...' : 'Add to cart'}
    </button>
  );
};

export default AddCart;
