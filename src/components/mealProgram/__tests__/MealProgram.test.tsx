import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { Root, signInUser } from '../../../setupTests';

test('navigate to text page', async () => {
  render(<App />, { wrapper: Root });
  signInUser();

  const textLink = await screen.findByText('Restaurant Meal Program');
  await userEvent.click(textLink);

  // meal program home
  const headerText = await screen.findByRole('heading', {
    level: 1,
    name: 'CK Meal Program',
  });

  expect(headerText).toBeDefined();
});

test('go to resources', async () => {
  render(<App />, { wrapper: Root });
  signInUser();

  const resourcesLink = await screen.findByText('Resources');
  await userEvent.click(resourcesLink);

  const guidlinesLink = await screen.findByText('Meal Guidelines');
  const packagingLink = await screen.findByText('Packaging');
  const invoicingLink = await screen.findByText('Invoicing');
  expect(guidlinesLink).toBeDefined();
  expect(packagingLink).toBeDefined();
  expect(invoicingLink).toBeDefined();
});

test('guidelines page', async () => {
  render(<App />, { wrapper: Root });
  signInUser();

  const guidlinesLink = await screen.findByText('Meal Guidelines');
  await userEvent.click(guidlinesLink);

  const youthLink = await screen.findByText('Youth Meal Program Guidelines');
  await userEvent.click(youthLink);
  const youthHeader = await screen.findByRole('heading', {
    level: 1,
    name: 'Community Kitchens Youth Meal Program Guidelines',
  });
  expect(youthHeader).toBeDefined();

  const encampmentLink = await screen.findByText(
    'Encampment Meal Program Guidelines'
  );
  await userEvent.click(encampmentLink);
  const encampmentHeader = await screen.findByRole('heading', {
    level: 1,
    name: 'Community Kitchens Encampment Meal Program Guidelines',
  });
  expect(encampmentHeader).toBeDefined();

  const resourcesLink = await screen.findByText('Meal Program Resources');
  await userEvent.click(resourcesLink);
});
