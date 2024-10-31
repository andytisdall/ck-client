import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { Root, signInAdmin } from '../../../setupTests';

test('navigate to text page', async () => {
  render(<App />, { wrapper: Root });
  signInAdmin();

  let textLink;
  await waitFor(() => {
    textLink = screen.getByText('Text Service');
  });
  if (textLink) {
    await userEvent.click(textLink);
  }

  // text home
  const headerText = await screen.findByRole('heading', {
    level: 1,
    name: 'Text Service',
  });
  expect(headerText).toBeDefined();
});
