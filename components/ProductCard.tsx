import Image from 'next/image';
import { formatPrice } from '@/utils';
import { Product } from '@/types';

interface Props extends Product {}

const ProductCard = ({ name, image, price }: Props) => {
  return (
    <div className="text-gray-700">
      <Image
        className="w-full h-auto rounded-lg"
        src={image}
        alt={name}
        width={800}
        height={800}
        priority
      />
      <div className="font-medium py-2">
        <h1>{name}</h1>
        <h2 className="text-sm text-teal-700">{price && formatPrice(price)}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
