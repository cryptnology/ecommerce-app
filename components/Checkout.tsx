'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import useCartStore from '@/store';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cart, paymentIntent, setPaymentIntent } = useCartStore();
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
        setClientSecret(data.paymentIntent.client_secret);
        setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  return (
    <div>
      {clientSecret && (
        <div>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Checkout;
