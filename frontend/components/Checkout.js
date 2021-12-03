import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import styled from 'styled-components';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px soild rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
console.log(stripeLib);

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles>
        <CardElement />
      </CheckoutFormStyles>
    </Elements>
  );
}

export { Checkout };
