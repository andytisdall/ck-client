import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Root from './root';
import App from './App';
import { user1 } from './mocks/data';

const adminSignedInState = {
  user: {
    user: user1,
  },
};

const getWrapper = (state) => {
  return ({ children }) => {
    return <Root initialState={state}>{children}</Root>;
  };
};

test('no links if not signed in', async () => {
  const wrapper = getWrapper({});
  render(<App />, { wrapper });

  // home page
  const unauthorizedMessage = await screen.findByText(
    /Please sign in to access the features of the Community Kitchens portal./i
  );
  expect(unauthorizedMessage).toBeInTheDocument();
});

test('can sign in', async () => {
  const wrapper = getWrapper({});
  render(<App />, { wrapper });

  const userName = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');

  await userEvent.type(userName, 'Test');
  await userEvent.type(passwordInput, 'Password');

  const submitButton = screen.getByRole('button', { name: 'Submit' });

  userEvent.click(submitButton);
  await waitFor(() => {
    const username = screen.getByText(user1.username);
    expect(username).toBeInTheDocument();
  });
});

test('username if signed in', async () => {
  const wrapper = getWrapper(adminSignedInState);
  render(<App />, { wrapper });
  const username = await screen.findByText(user1.username);
  expect(username).toBeInTheDocument();
});
