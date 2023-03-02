import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Root from './root';
import App from './App';

const adminSignedInState = {
  user: {
    user: {
      username: '',
      id: 'failjrse48jf48',
      admin: true,
      salesforceId: 'f4s9jf4s9j',
      active: true,
    },
  },
};

let wrapper = ({ children }) => {
  return <Root initialState={{}}>{children}</Root>;
};

// test('no links if not signed in', async () => {
//   render(<App />, { wrapper });

//   // home page
//   const unauthorizedMessage = screen.getByText(
//     /Please sign in to access the features of the Community Kitchens portal./i
//   );
//   expect(unauthorizedMessage).toBeInTheDocument();

//   const userName = screen.getByLabelText('Username:');
//   const passwordUInput = screen.getByLabelText('Password:');
// });
