"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Spinner_1 = __importDefault(require("react-activity/dist/Spinner"));
require("react-activity/dist/Spinner.css");
require("./Loading.css");
var Loading = function () {
    return (0, jsx_runtime_1.jsx)(Spinner_1.default, { size: 30, className: "spinner", "data-id": "loading" });
};
exports.default = Loading;
