import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { user2 } from '../../../test/data';
import { Root, signInUser } from '../../../setupTests';

test('sign in button if not signed in', async () => {
  render(<App />, { wrapper: Root });
  // home page

  const userMenuBtn = await screen.findByAltText('User Menu');

  userEvent.click(userMenuBtn);

  const unauthorizedMessage = await screen.findByText(/Sign In/);
  expect(unauthorizedMessage).toBeInTheDocument();
});

test('can sign in', async () => {
  render(<App />, { wrapper: Root });

  const userMenuBtn = await screen.findByAltText('User Menu');
  userEvent.click(userMenuBtn);

  const userName = await screen.findByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');

  await userEvent.type(userName, 'Test');
  await userEvent.type(passwordInput, 'Password');

  const submitButton = screen.getByRole('button', { name: 'Submit' });

  userEvent.click(submitButton);

  await waitFor(() => {
    const username = screen.getByText(user2.username);
    expect(username).toBeInTheDocument();
  });
});

test('username if signed in', async () => {
  render(<App />, { wrapper: Root });
  signInUser();

  const userMenuBtn = await screen.findByAltText('User Menu');
  await userEvent.click(userMenuBtn);
  const username = await screen.findByText(user2.username);
  expect(username).toBeInTheDocument();
});
