import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns-tz';

import { hours2, job1 } from '../../../mocks/data';
import App from '../../../App';
import { Root } from '../../../setupTests';

// const getRandomChars = () => {
//   return (Math.random() + 1).toString(36).substring(7);
// };

test('navigate to CK Kitchen home', async () => {
  render(<App />, { wrapper: Root });

  window.localStorage.removeItem('ck-token');

  const volLink = await screen.findByText('CK Volunteers');
  userEvent.click(volLink);

  // text home
  const headerText = await screen.findByRole('heading', {
    level: 1,
    name: 'CK Volunteers',
  });
  expect(headerText).toBeDefined();
});

test('create contact and see list of jobs', async () => {
  render(<App />, { wrapper: Root });
  window.localStorage.removeItem('ck-token');

  const kitchenLink = await screen.findByText('CK Kitchen Volunteers');
  userEvent.click(kitchenLink);

  const signupLink = await screen.findByText(
    'Sign Up to Volunteer / See your shifts'
  );
  userEvent.click(signupLink);

  const email = 'andrew@gmail.com';

  const emailInput = await screen.findByText('Email:');
  userEvent.click(emailInput);
  userEvent.type(emailInput, email + '[Enter]');

  await waitFor(() => {
    const firstNameInputLabel = screen.getByText('First Name:');
    expect(firstNameInputLabel).toBeDefined();
  });

  const firstNameInputLabel = screen.getByText('First Name:');
  const lastNameInputLabel = screen.getByText('Last Name:');

  userEvent.type(firstNameInputLabel, 'New');
  setTimeout(() => {
    userEvent.type(lastNameInputLabel, 'User[Enter]');
  }, 50);

  await waitFor(() => {
    const jobName = screen.getByText('Positions Available');
    expect(jobName).toBeDefined();
  });
});

test('find contact and show list of jobs', async () => {
  render(<App />, { wrapper: Root });
  window.localStorage.removeItem('ck-token');

  const volLink = await screen.findByText('CK Volunteers');
  userEvent.click(volLink);
  const kitchenLink = await screen.findByText('CK Kitchen Volunteers');
  userEvent.click(kitchenLink);
  const signupLink = await screen.findByText(
    'Sign Up to Volunteer / See your shifts'
  );
  userEvent.click(signupLink);

  const emailInput = await screen.findByText('Email:');

  userEvent.click(emailInput);
  userEvent.type(emailInput, 'andrew.tisdall@gmail.com[Enter]');

  await waitFor(() => {
    const jobName = screen.getByText(job1.name);
    expect(jobName).toBeDefined();
  });
});

test('get job info and sign up for shift', async () => {
  render(<App />, { wrapper: Root });

  const jobLink = await screen.findByText(
    format(new Date(hours2.time), 'eee, M/d/yy h:mm a')
  );
  expect(jobLink).toBeDefined();

  userEvent.click(jobLink);

  const jobName = await screen.findByText(job1.name);
  expect(jobName).toBeDefined();

  const confirmSignup = await screen.findByText('Confirm Signup');
  userEvent.click(confirmSignup);

  const confirmationMsg = await screen.findByText(
    'You have successfully signed up for this shift:'
  );
  expect(confirmationMsg).toBeDefined();
});

test('cancel job signup', async () => {
  render(<App />, { wrapper: Root });

  const cancelBtn = await screen.findByText(
    'Cancel Your Booked Volunteer Time'
  );
  userEvent.click(cancelBtn);

  const cancelMsg = await screen.findByText('You have canceled this shift:');
  expect(cancelMsg).toBeDefined();
});
