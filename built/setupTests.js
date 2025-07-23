"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require("@testing-library/jest-dom");
var react_redux_1 = require("react-redux");
var store_1 = require("./state/store");
jest.mock("@react-oauth/google");
var Root = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(react_redux_1.Provider, { store: store_1.store, children: children });
};
exports.Root = Root;
var localStorageMock = (function () {
    var store = {};
    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        removeItem: function (key) {
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
    value: function (to) { },
});
