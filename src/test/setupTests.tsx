import "@testing-library/jest-dom";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../state/store";

jest.mock("@react-oauth/google");
jest.mock("react-barcode-scanner/polyfill");

global.URL.createObjectURL = jest.fn((file: File) => file.name);

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

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

Object.defineProperty(window, "scrollTo", {
  value: (_to: number) => {},
});
