import React from 'react';
import Image from 'next/image';
import { QueryType } from '@/types';
import { formatPrice } from '@/utils';
import AddCart from './AddCart';

const Product = async ({ searchParams }: QueryType) => {
  const { name, image, unit_amount, description, features } = searchParams;

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-16">
      <Image
        className="w-full h-auto rounded-lg"
        src={image}
        alt={name}
        width={600}
        height={600}
        priority
      />
      <div className="font-medium">
        <h1 className="text-2xl py-2">{name}</h1>
        <p className="py-2">{description}</p>
        <p className="py-2">{features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {unit_amount && formatPrice(unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
};

export default Product;
