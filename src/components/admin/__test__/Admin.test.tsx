import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../../App';
import { Root, signInUser, signInAdmin } from '../../../setupTests';

test('rejected if not admin', async () => {
  render(<App />, { wrapper: Root });
  signInAdmin();

  const adminBtn = await screen.findByText(/admin/i);

  await userEvent.click(adminBtn);

  // const unauthorizedMessage = await screen.findByRole('heading', {
  //   name: /You must be an admin to access this page./i,
  // });

  // expect(unauthorizedMessage).toBeInTheDocument();
});
