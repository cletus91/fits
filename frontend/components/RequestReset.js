import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import Error from './ErrorMessage';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;
export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [reset, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    reset();
    resetForm();
  }

  return (
    <div>
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Request a Password Reset</h2>
        <Error error={error} />
        <fieldset>
          {data?.sendUserPasswordResetLink === null && (
            <p>Success! Please check your email for the link!</p>
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
          <button type="submit">Reset Your Password</button>
        </fieldset>
      </Form>
    </div>
  );
}
