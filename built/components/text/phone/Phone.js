"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var AddPhone_1 = __importDefault(require("./AddPhone"));
var DeletePhone_1 = __importDefault(require("./DeletePhone"));
require("./Phone.css");
var Phone = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "phone", children: [(0, jsx_runtime_1.jsx)(AddPhone_1.default, {}), (0, jsx_runtime_1.jsx)(DeletePhone_1.default, {})] }));
};
exports.default = Phone;
