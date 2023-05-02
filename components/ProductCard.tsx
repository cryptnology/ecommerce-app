import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils';
import { ProductType } from '@/types';

interface Props extends ProductType {}

const ProductCard = ({
  id,
  name,
  image,
  unit_amount,
  description,
  metadata,
}: Props) => {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: {
          id,
          name,
          image,
          unit_amount,
          description,
          features,
        },
      }}
    >
      <div>
        <Image
          className="w-full h-auto rounded-lg"
          src={image}
          alt={name}
          width={600}
          height={600}
          priority
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
