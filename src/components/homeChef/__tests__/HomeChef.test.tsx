import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format, utcToZonedTime } from 'date-fns-tz';

import App from '../../../App';
import { job1, shift1, hours1, hours2 } from '../../../test/data';
import { Root, signInUser } from '../../../setupTests';

test('navigate to home chef page', async () => {
  render(<App />, { wrapper: Root });

  const volunteersLink = await screen.findByText('CK Volunteers');
  await userEvent.click(volunteersLink);
  // volunteers home
  const homeChefLink = await screen.findByText('Home Chef Volunteers');
  await userEvent.click(homeChefLink);

  // home chef home
  const statusText = await screen.findByText(
    'You are done with the onboarding process and may sign up for Town Fridge deliveries'
  );
  expect(statusText).toBeDefined();
});

test('see chef shifts', async () => {
  render(<App />, { wrapper: Root });
  signInUser();

  const chefLink = await screen.findByText(
    "See upcoming deliveries you've signed up for, and past deliveries you've made"
  );
  await userEvent.click(chefLink);

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
  render(<App />, { wrapper: Root });
  signInUser();

  const homeChefHome = await screen.findByAltText('home chef header');
  await userEvent.click(homeChefHome);
  const signupLink = await screen.findByText('Sign Up to Stock a Town Fridge');
  await userEvent.click(signupLink);

  // list view

  const jobTitle = await screen.findByText(job1.name);
  await userEvent.click(jobTitle);
  const shiftDate = await screen.findByText(
    format(utcToZonedTime(shift1.startTime, 'America/Los_Angeles'), 'M/d/yy')
  );
  expect(shiftDate).toBeDefined();

  const signupBtn = screen.getAllByRole('button', { name: 'Sign Up' });
  await userEvent.click(signupBtn[1]);

  // sign up screen

  const mealInput = await screen.findByLabelText(/number of meals/i);

  await userEvent.type(mealInput, '30');

  const submitBtn = await screen.findByText('Sign Up');
  await userEvent.click(submitBtn);

  // confirmation screen
  const confirmation = await screen.findByText(/confirmation/i);
  expect(confirmation).toBeDefined();

  const date = await screen.findByText(
    format(utcToZonedTime(hours2.time, 'America/Los_Angeles'), 'eeee, M/d/yy')
  );
  expect(date).toBeDefined();

  const chefLink = screen.getByRole('button', {
    name: 'See your future and past shifts',
  });
  await userEvent.click(chefLink);
});
