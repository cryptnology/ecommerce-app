import React from 'react';
import Image from 'next/image';
import { QueryType } from '@/types';
import { formatPrice } from '@/utils';

const Product = async ({ searchParams }: QueryType) => {
  const { name, image, unit_amount, description, features } = searchParams;

  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        className="w-full h-auto rounded-lg"
        src={image}
        alt={name}
        width={600}
        height={600}
        priority
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{name}</h1>
        <p className="py-2">{description}</p>
        <p className="py-2">{features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {unit_amount && formatPrice(unit_amount)}
          </p>
        </div>
        <button className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
