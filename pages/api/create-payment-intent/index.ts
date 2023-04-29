import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

import { authOptions } from '../auth/[...nextauth]';
import { calculateOrderAmount } from '@/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const prisma = new PrismaClient();

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
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  /* Check if the payment intent exists and just update the order */
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id,
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateOrderAmount(items) },
      );
      /* Featch order with product ids */
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: updated_intent.id },
        include: { products: true },
      });
      if (!existing_order)
        res.status(400).json({ message: 'Invalid Payment Intent' });

      /* Update existing order */
      const updated_order = await prisma.order.update({
        where: { id: existing_order?.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      res.status(200).json({ paymentIntent: updated_intent });
      return;
    }
  } else {
    /* Create new order with prisma */
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
    return;
  }

  /* Data necessary for the order */
};

export default handler;
