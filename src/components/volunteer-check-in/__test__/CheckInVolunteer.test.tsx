import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import Root from '../../../Root';
import { createServer } from '../../../test/createServer';
import { User } from '../../../state/apis/authApi';
import { VolunteerForCheckIn } from '../../../state/apis/volunteerApi/kitchenApi';

const adminUser: User = {
  username: 'bojee',
  id: 'failjrse48jf48',
  admin: true,
  salesforceId: 'f4s9jf4s9j',
  active: true,
};

const volunteer1: VolunteerForCheckIn = {
  hoursId: 'iow84hy',
  contactId: 'w8hrc',
  firstName: 'Jamie',
  lastName: 'Lannister',
  email: 'm.com',
  volunteerAgreement: true,
  status: 'Confirmed',
};

const volunteer2: VolunteerForCheckIn = {
  hoursId: '3wf4',
  contactId: 'dih',
  firstName: 'Ned',
  lastName: 'Stark',
  email: 'mo.com',
  volunteerAgreement: false,
  status: 'Confirmed',
};

describe('volunteer not checked in', () => {
  createServer([
    { path: '/user', res: async () => adminUser },
    {
      path: '/volunteers/check-in/shifts',
      res: async () => ({ shiftId: 'd3i7h' }),
    },
    {
      path: '/volunteers/check-in/:shiftId',
      res: async () => [volunteer1, volunteer2],
    },
    { path: '/volunteers/check-in', method: 'post', res: async () => null },
  ]);

  test("See today's volunteers", async () => {
    render(<App />, { wrapper: Root });

    const adminBtn = await screen.findByText(/admin/i);
    await userEvent.click(adminBtn);

    const volunteerCheckInBtn = await screen.findByText(/volunteer check-in/i);
    await userEvent.click(volunteerCheckInBtn);

    const kitchenBtn = await screen.findByText(/kitchen/i);
    await userEvent.click(kitchenBtn);
  });

  test('Check in volunteer', async () => {
    render(<App />, { wrapper: Root });

    const volunteer1Btn = await screen.findByRole('link', {
      name: RegExp(volunteer1.lastName),
    });
    await userEvent.click(volunteer1Btn);

    const checkInBtn = await screen.findByText(/check in/i);
    await userEvent.click(checkInBtn);

    const success = await screen.findByText(/successfully/i);
    expect(success).toBeInTheDocument();
  });
});

describe('volunteer is checked in', () => {
  createServer([
    { path: '/user', res: async () => adminUser },
    {
      path: '/volunteers/check-in/:shiftId',
      res: async () => [{ ...volunteer1, status: 'Completed' }, volunteer2],
    },
    { path: '/volunteers/check-in', method: 'post', res: async () => null },
  ]);

  test('See checked in volunteer', async () => {
    render(<App />, { wrapper: Root });

    await waitFor(
      async () => {
        const volunteer1Name = screen.getByText(RegExp(volunteer1.lastName));
        expect(volunteer1Name).toBeInTheDocument();
      },
      { timeout: 3500 }
    );

    const volunteer1Btn = screen.queryByRole('link', {
      name: RegExp(volunteer1.lastName),
    });
    expect(volunteer1Btn).not.toBeInTheDocument();
  });
});

describe('prompted to sign agreement if not signed', () => {
  createServer([
    { path: '/user', res: async () => adminUser },
    {
      path: '/volunteers/check-in/:shiftId',
      res: async () => [volunteer1, volunteer2],
    },
  ]);

  test('agreement', async () => {
    render(<App />, { wrapper: Root });

    const volunteer1Btn = await screen.findByRole('link', {
      name: RegExp(volunteer2.lastName),
    });
    await userEvent.click(volunteer1Btn);

    const signLink = await screen.findByText(/sign the agreement/i);
    expect(signLink).toBeInTheDocument();
  });
});

describe('not authorized', () => {
  createServer([
    { path: '/user', res: async () => ({ ...adminUser, admin: false }) },
  ]);

  test('Unauthorized if not admin', async () => {
    render(<App />, { wrapper: Root });

    const permission = await screen.findByText(/permission/i);
    expect(permission).toBeInTheDocument();
  });
});
