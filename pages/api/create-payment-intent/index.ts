import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';

import { authOptions } from '../auth/[...nextauth]';
import { calculateOrderAmount } from '@/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: 'Not logged in' });
    return;
  }
  /* Extract data from the body */
  const { items, payment_intent_id } = req.body;

  /* Create the order data */
  const orderData = {
    user: {
      connect: { id: userSession.user.id },
    },
    amount: calculateOrderAmount(items),
    currency: 'gbp',
    status: 'pending',
    paymentIntentId: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description,
        unit_amount: item.unit_amount,
        quantity: item.quantity,
      })),
    },
  };

  res.status(200).json({ userSession });
  return;
  /* Data necessary for the order */
};

export default handler;
