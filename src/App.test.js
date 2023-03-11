import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Root from './root';
import App from './App';

const adminSignedInState = {
  user: {
    user: {
      username: 'bojee',
      id: 'failjrse48jf48',
      admin: true,
      salesforceId: 'f4s9jf4s9j',
      active: true,
    },
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

  userEvent.type(userName, 'Test');
});

test('username if signed in ', async () => {
  const wrapper = getWrapper(adminSignedInState);
  render(<App />, { wrapper });
  const username = await screen.findByText('bojee');
});
