'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import useCartStore from '@/store';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cart, paymentIntent } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart,
        payment_intent_id: paymentIntent,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push('/api/auth/signin');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
};

export default Checkout;
