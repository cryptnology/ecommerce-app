import Stripe from 'stripe';
import { ProductCard } from '@/components';

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });
  const products = await stripe.products.list();

  return await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      const features = product.metadata.features;

      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features },
      };
    }),
  );
};

const Home = async () => {
  const products = await getProducts();

  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  );
};

export default Home;
