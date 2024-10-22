// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './state/store';
import { api } from './state/api';

const clientId =
  '385802469502-061cv1crj954fcp56kthk40u918eu1ot.apps.googleusercontent.com';

export const Root = ({ children }: PropsWithChildren) => {
  window.localStorage.setItem('ck-token', 'token');

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  );
};

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: any) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// set up server before all tests and then close after
beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  store.dispatch(api.util.resetApiState());
  store.dispatch({ type: 'volunteer/reset' });

  // window.localStorage.removeItem('ck-token');
});

afterAll(() => server.close());
