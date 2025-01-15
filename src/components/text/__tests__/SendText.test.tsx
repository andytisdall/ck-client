import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createServer } from '../../../test/createServer';
import App from '../../../App';
import { Root } from '../../../setupTests';
import { User } from '../../../state/apis/authApi';

const user: User = {
  username: 'chompy',
  id: '48yrf848fy48',
  admin: true,
  salesforceId: 'd093900',
  active: true,
};

createServer([{ path: '/user', res: async () => user }]);

test('navigate to text page', async () => {
  render(<App />, { wrapper: Root });

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
