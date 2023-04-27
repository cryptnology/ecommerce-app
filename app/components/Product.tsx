import Image from 'next/image';

interface Props {
  name: string;
  image: string;
  price: number | null;
}

const Product = ({ name, image, price }: Props) => {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} priority />
      <h1>{name}</h1>
      {price}
    </div>
  );
};

export default Product;
