// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { api } from './state/api';

jest.mock('@react-oauth/google');

export const Root = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
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

export const signInUser = () => {
  window.localStorage.setItem('ck-token', 'auth');
};

export const signInAdmin = () => {
  window.localStorage.setItem('ck-token', 'admin');
};

// set up server before all tests and then close after
beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  store.dispatch(api.util.resetApiState());
  store.dispatch({ type: 'volunteer/reset' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
