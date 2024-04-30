import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  const email = 'notinsalesforce@fake.com';

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
    const jobName = screen.getByText('Volunteer Opportunities');
    expect(jobName).toBeDefined();
  });
});

// test('find contact and show list of jobs', async () => {
//   render(<App />, { wrapper: Root });
//   window.localStorage.removeItem('ck-token');

//   const emailInput = await screen.findByText('Email:');
//   userEvent.click(emailInput);
//   userEvent.type(emailInput, 'andrew.tisdall@gmail.com');
//   userEvent.type(emailInput, '[Enter]');

//   await waitFor(() => {
//     const jobName = screen.getByText('Tuesday Meal Prep');
//     expect(jobName).toBeDefined();
//   });
// });
