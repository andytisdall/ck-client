import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { user1 } from '../../../mocks/data';
import { getWrapper } from '../../../setupTests';

const adminSignedInState = {
  user: {
    user: user1,
  },
};

test('navigate to home chef page', async () => {
  const wrapper = getWrapper(adminSignedInState);
  render(<App />, { wrapper });
  const homeChefLink = await screen.findByText('Home Chef');
  userEvent.click(homeChefLink);

  // home chef home
  const statusText = await screen.findByText(
    'Your Status: You are done with the onboarding process and may sign up for Town Fridge deliveries'
  );
  expect(statusText).toBeDefined();
});
