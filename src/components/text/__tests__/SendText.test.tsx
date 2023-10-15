import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { Root } from '../../../setupTests';

test('navigate to text page', async () => {
  render(<App />, { wrapper: Root });
  const textLink = await screen.findByText('Text Service');
  userEvent.click(textLink);

  // text home
  const headerText = await screen.findByRole('heading', {
    level: 1,
    name: 'Text Service',
  });
  expect(headerText).toBeDefined();
});
