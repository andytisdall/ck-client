import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { user2 } from '../../../mocks/data';
import App from '../../../App';
import { getWrapper } from '../../../setupTests';

const adminSignedInState = {
  user: {
    user: user2,
  },
};

test('navigate to text page', async () => {
  const wrapper = getWrapper(adminSignedInState);
  render(<App />, { wrapper });
  const textLink = await screen.findByText('Text Service');
  userEvent.click(textLink);

  // text home
  const headerText = await screen.findByRole('heading', {
    level: 1,
    name: 'Text Service',
  });
  expect(headerText).toBeDefined();
});
