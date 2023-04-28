import Image from 'next/image';
import { formatPrice } from '@/utils';
import { Product } from '@/types';

interface Props extends Product {}

const ProductCard = ({ name, image, price }: Props) => {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} priority />
      <h1>{name}</h1>
      {price ? formatPrice(price) : 'N/A'}
    </div>
  );
};

export default ProductCard;
