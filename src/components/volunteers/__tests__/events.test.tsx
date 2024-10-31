import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns-tz';

import { hours2, job1, eventCampaign } from '../../../mocks/data';
import App from '../../../App';
import { Root, signInUser } from '../../../setupTests';

test('navigate to volunteers home', async () => {
  render(<App />, { wrapper: Root });

  const volLink = await screen.findByText('CK Volunteers');
  userEvent.click(volLink);

  const eventsTitle = await screen.findByText(
    'Special Event Volunteer Opportunities'
  );
  act(() => {
    expect(eventsTitle).toBeDefined();
  });
});

test('create contact and see list of jobs', async () => {
  render(<App />, { wrapper: Root });

  const eventLink = await screen.findByText(eventCampaign.name);
  userEvent.click(eventLink);

  const email = 'andrew@gmail.com';

  let emailInput;
  await waitFor(() => {
    emailInput = screen.getByText('Email:');
  });

  if (emailInput) {
    userEvent.click(emailInput);
    userEvent.type(emailInput, email + '[Enter]');
  }

  await waitFor(() => {
    const firstNameInputLabel = screen.getByText('First Name:');
    act(() => {
      expect(firstNameInputLabel).toBeDefined();
    });
  });

  const firstNameInputLabel = screen.getByText('First Name:');
  const lastNameInputLabel = screen.getByText('Last Name:');

  userEvent.type(firstNameInputLabel, 'New');
  setTimeout(() => {
    userEvent.type(lastNameInputLabel, 'User[Enter]');
  }, 50);

  await waitFor(() => {
    const jobName = screen.getByText('Positions Available');
    act(() => {
      expect(jobName).toBeDefined();
    });
  });
});

test('get job info and sign up for shift', async () => {
  render(<App />, { wrapper: Root });
  signInUser();

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
  act(() => {
    expect(confirmationMsg).toBeDefined();
  });
});

test('cancel job signup', async () => {
  render(<App />, { wrapper: Root });
  signInUser();

  const cancelBtn = await screen.findByText(
    'Cancel Your Booked Volunteer Time'
  );
  userEvent.click(cancelBtn);

  const cancelMsg = await screen.findByText('You have canceled this shift:');

  act(() => {
    expect(cancelMsg).toBeDefined();
  });
});
