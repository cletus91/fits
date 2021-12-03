import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { element } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px soild rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const ErrorStyles = styled.div`
  font-size: 1.5rem;
  color: var(--red);
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    // 1. Stop form from submitting and turn on loader
    e.preventDefault();
    setLoading(true);
    // 2. Start page transition
    nProgress.start();
    // 3. Create payment method via Stripe (Token comes back if successfull)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4. Handle errors from Stripe
    if (error) {
      setError(error);
    }
    // 5. Send token from step 3 to keystone server via a custom mutation
    // 6. Change the page to view the order
    // 7. Close the cart
    // 8. Turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <ErrorStyles>{error.message}</ErrorStyles>}
      <CardElement />
      <SickButton>Checkout Now 🛒</SickButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
