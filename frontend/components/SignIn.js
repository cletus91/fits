import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch currently logged in user
    refetchQueries: [{ query: CURRENT_USER }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(inputs);
    await signin();
    // console.log(res);
    resetForm();
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <div>
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign into your account</h2>
        <Error error={error} />
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign In</button>
        </fieldset>
      </Form>
    </div>
  );
}
