import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;
export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, error, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfullError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await reset().catch(console.log(successfullError));
    // console.log(res);
    // console.log({ data, loading });
    resetForm();
  }

  return (
    <div>
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Request a Password Reset</h2>
        <Error error={successfullError || error} />
        <fieldset>
          {data?.redeemUserPasswordResetToken === null && (
            <p>Success! Please Sign In!</p>
          )}
          <label htmlFor="passwordresetemail">
            Email
            <input
              type="email"
              name="email"
              id="passwordresetemail"
              placeholder="Enter your email"
              autoComplete="email"
              required
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="signuppassword">
            Password
            <input
              type="password"
              name="password"
              id="signuppassword"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>
    </div>
  );
}
