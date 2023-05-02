'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCartStore } from '@/store';
import { calculateOrderAmount, formatPrice } from '@/utils';

interface Props {
  clientSecret: string | undefined;
}

const CheckoutForm = ({ clientSecret }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { cart, setOnCheckout } = useCartStore();

  useEffect(() => {
    if (!stripe && !clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) setOnCheckout('success');
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <h1 className="py-4 text-sm font-bold">
        Total: {formatPrice(calculateOrderAmount(cart))}
      </h1>
      <button
        className="py-2 mt-4 w-full btn btn-primary"
        id="submit"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ? <span>Processing</span> : <span>Pay now</span>}
        </span>
      </button>
    </form>
  );
};

export default CheckoutForm;
