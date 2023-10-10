import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format, utcToZonedTime } from 'date-fns-tz';

import App from '../../../App';
import { user1, job1, shift1, hours1, hours2 } from '../../../mocks/data';
import { getWrapper } from '../../../setupTests';

const adminSignedInState = {
  user: {
    user: user1,
  },
};

test('navigate to home chef page', async () => {
  const wrapper = getWrapper(adminSignedInState);
  render(<App />, { wrapper });
  const volunteersLink = await screen.findByText('CK Volunteers');
  userEvent.click(volunteersLink);
  // volunteers home
  const homeChefLink = await screen.findByText('Home Chef Volunteers');
  userEvent.click(homeChefLink);

  // home chef home
  const statusText = await screen.findByText(
    'Your Status: You are done with the onboarding process and may sign up for Town Fridge deliveries'
  );
  expect(statusText).toBeDefined();
});

test('see chef shifts', async () => {
  const wrapper = getWrapper(adminSignedInState);
  render(<App />, { wrapper });
  const chefLink = await screen.findByText("See Fridges You've Signed Up For");
  userEvent.click(chefLink);

  // chef page
  const upcomingShifts = await screen.findByRole('heading', {
    name: 'Upcoming Deliveries',
  });
  expect(upcomingShifts).toBeDefined();

  const hours = screen.getByText(
    format(utcToZonedTime(hours1.time, 'America/Los_Angeles'), 'eee, M/d/yy')
  );
  expect(hours).toBeDefined();
});

test('sign up with list view', async () => {
  const wrapper = getWrapper(adminSignedInState);
  render(<App />, { wrapper });
  const homeChefHome = screen.getByAltText('home chef header');
  userEvent.click(homeChefHome);
  const signupLink = await screen.findByText('Sign Up to Stock a Town Fridge');
  userEvent.click(signupLink);

  // list view

  const jobTitle = await screen.findByText(job1.name);
  userEvent.click(jobTitle);
  const shiftDate = await screen.findByText(
    format(utcToZonedTime(shift1.startTime, 'America/Los_Angeles'), 'M/d/yy')
  );
  expect(shiftDate).toBeDefined();

  const signupBtn = screen.getAllByRole('button', { name: 'Sign Up' });
  userEvent.click(signupBtn[1]);

  // sign up screen

  const mealInput = await screen.findByLabelText(
    'Number of Meals You Plan to Deliver:'
  );

  userEvent.type(mealInput, '30');

  const submitBtn = await screen.findByText('Submit');
  userEvent.click(submitBtn);

  // confirmation screen
  const confirmation = await screen.findByText(/confirmation/i);
  expect(confirmation).toBeDefined();

  const date = await screen.findByText(
    format(utcToZonedTime(hours2.time, 'America/Los_Angeles'), 'eeee, M/d/yyyy')
  );
  expect(date).toBeDefined();

  const chefLink = screen.getByRole('button', {
    name: 'See your future and past shifts',
  });
  userEvent.click(chefLink);
});
