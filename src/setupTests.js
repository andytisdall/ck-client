// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server';
import Root from './root';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientId } from './root';

export const getWrapper = (state) => {
  return ({ children }) => {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <Root initialState={state}>{children}</Root>
      </GoogleOAuthProvider>
    );
  };
};

// set up server before all tests and then close after
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
