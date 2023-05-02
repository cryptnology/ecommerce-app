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
      <div className="bg-base-200 p-4 rounded-lg">
        <Image
          className="w-full h-auto rounded-lg"
          src={image}
          alt={name}
          width={600}
          height={600}
          priority
        />
        <div className="font-medium pt-2">
          <div className="h-6">
            <h1 className="line-clamp-2">{name}</h1>
          </div>
          <div>
            <h2 className="text-sm text-accent-focus mt-8">
              {unit_amount && formatPrice(unit_amount)}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
