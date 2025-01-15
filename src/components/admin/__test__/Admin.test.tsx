import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { Root } from '../../../setupTests';
import { User } from '../../../state/apis/authApi';
import { createServer } from '../../../test/createServer';

const adminUser: User = {
  username: 'bojee',
  id: 'failjrse48jf48',
  admin: true,
  salesforceId: 'f4s9jf4s9j',
  active: true,
};

const user: User = {
  username: 'chompy',
  id: '48yrf848fy48',
  admin: false,
  salesforceId: 'd093900',
  active: true,
};

describe('admin', () => {
  createServer([
    { path: '/user', res: async () => adminUser },
    { path: '/meal-program/restaurant', res: async () => null },
  ]);

  test('can see admin btns if admin', async () => {
    render(<App />, { wrapper: Root });

    const adminBtn = await screen.findByText(/admin/i);
    await userEvent.click(adminBtn);

    const pushNotificationBtn = await screen.findByText(
      /send a push notification/i
    );

    expect(pushNotificationBtn).toBeInTheDocument();
  });
});

describe('not admin', () => {
  createServer([{ path: '/user', res: async () => user }]);

  test('rejected if not admin', async () => {
    render(<App />, { wrapper: Root });

    const unauthorizedMessage = await screen.findByText(
      /You must be an admin to access this page/i
    );

    expect(unauthorizedMessage).toBeInTheDocument();
  });
});
