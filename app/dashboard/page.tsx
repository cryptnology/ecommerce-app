import Image from 'next/image';
import { formatPrice } from '@/utils';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) return null;

  return await prisma.order.findMany({
    where: { userId: user?.user?.id, status: 'complete' },
    include: {
      products: true,
    },
  });
};

const Dashboard = async () => {
  const orders = await fetchOrders();

  if (orders === null)
    return <div>You need to be logged in to view your orders.</div>;

  return (
    <div>
      <h1 className="font-bold">
        {orders.length === 0 ? 'No Orders' : 'Your Orders'}
      </h1>
      <div className="font-medium">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
          >
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            <p className="text-xs">
              Status:{' '}
              <span
                className={`${
                  order.status === 'complete' ? 'bg-teal-500' : 'bg-orange-500'
                } capitalize text-white py-1 rounded-md px-2 mx-2 text-xs`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-xs">
              Time: {new Date(order.createdDate).toString()}
            </p>
            <div className="text-sm lg:flex items-center gap-4">
              {order.products.map((product) => (
                <div key={product.id} className="py-2">
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      alt={product.name}
                      height={36}
                      width={36}
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-xs">Total: {formatPrice(order.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
