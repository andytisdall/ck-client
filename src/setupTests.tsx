// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { RootState } from './state/store';
import { server } from './mocks/server';
import Root from './Root';
import { PropsWithChildren } from 'react';

export const getWrapper = (state: RootState) => {
  return ({ children }: PropsWithChildren) => {
    return <Root initialState={state}>{children}</Root>;
  };
};

// set up server before all tests and then close after
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
