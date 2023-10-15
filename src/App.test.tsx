import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { user1 } from './mocks/data';
import { Root } from './setupTests';

test('sign in button if not signed in', async () => {
  // const wrapper = getWrapper({});
  render(<App />, { wrapper: Root });
  window.localStorage.removeItem('ck-token');
  // home page
  const unauthorizedMessage = await screen.findByText(/Sign In/);
  expect(unauthorizedMessage).toBeInTheDocument();
});

test('can sign in', async () => {
  render(<App />, { wrapper: Root });
  window.localStorage.removeItem('ck-token');

  const userName = await screen.findByPlaceholderText('Username');
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
  render(<App />, { wrapper: Root });
  const username = await screen.findByText(user1.username);
  expect(username).toBeInTheDocument();
});
