import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { Root } from '../../../setupTests';
import { createServer } from '../../../test/createServer';
import { User } from '../../../state/apis/authApi';

const user: User = {
  username: 'chompy',
  id: '48yrf848fy48',
  admin: false,
  salesforceId: 'd093900',
  active: true,
};

describe('not signed in', () => {
  createServer([
    {
      path: '/user',
      res: async (req) => {
        if (![...req.headers].length) {
          return null;
        }
        return user;
      },
    },
    {
      path: '/signin',
      res: async () => {
        return { user, token: 'token' };
      },
      method: 'post',
    },
    // { path: '/meal-program/restaurant', res: async () => null },
  ]);

  test('sign in button if not signed in', async () => {
    render(<App />, { wrapper: Root });
    // home page

    const userMenuBtn = await screen.findByAltText('User Menu');

    userEvent.click(userMenuBtn);

    await waitFor(
      () => {
        const unauthorizedMessage = screen.getByText(/Sign In/);

        expect(unauthorizedMessage).toBeInTheDocument();
      },
      { timeout: 500 }
    );
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
    await waitFor(
      () => {
        screen.getByText(user.username);
      },
      { timeout: 500 }
    );
  });
});

describe.skip('signed in', () => {
  createServer([
    { path: '/user', res: async () => user },
    {
      path: '/signin',
      res: async () => {
        return { user, token: 'token' };
      },
    },
    { path: '/meal-program/restaurant', res: async () => null },
  ]);

  test('username if signed in', async () => {
    render(<App />, { wrapper: Root });

    const userMenuBtn = await screen.findByAltText('User Menu');
    await userEvent.click(userMenuBtn);
    const username = await screen.findByText(user.username);

    await waitFor(
      () => {
        expect(username).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });
});
