import { render, screen } from '@testing-library/react';
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

  const textLink = await screen.findAllByText('Text Service');
  if (textLink[0]) {
    await userEvent.click(textLink[0]);
  }

  // text home
  const headerText = await screen.findByRole('heading', {
    level: 1,
    name: 'Text Service',
  });
  expect(headerText).toBeDefined();
});
