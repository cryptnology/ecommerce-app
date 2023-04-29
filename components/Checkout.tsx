'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import useCartStore from '@/store';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cart, paymentIntent } = useCartStore();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart,
        payment_intent_id: paymentIntent,
      }),
    });
  }, []);

  return <div>Checkout</div>;
};

export default Checkout;
