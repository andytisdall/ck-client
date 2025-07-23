"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("react-dom/client");
var Root_1 = __importDefault(require("./Root"));
require("./index.css");
var App_1 = __importDefault(require("./App"));
document.body.innerHTML = '<div id="root"></div';
var root = (0, client_1.createRoot)(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(Root_1.default, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }));
