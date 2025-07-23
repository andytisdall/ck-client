"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var EditUser_1 = __importDefault(require("./EditUser"));
var CreateUser_1 = __importDefault(require("./CreateUser"));
var DeleteUser_1 = __importDefault(require("./DeleteUser"));
var SignInAsUser_1 = __importDefault(require("./SignInAsUser"));
var User = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "create-main", children: [(0, jsx_runtime_1.jsx)(CreateUser_1.default, {}), (0, jsx_runtime_1.jsx)(EditUser_1.default, {}), (0, jsx_runtime_1.jsx)(DeleteUser_1.default, {}), (0, jsx_runtime_1.jsx)(SignInAsUser_1.default, {})] }));
};
exports.default = User;
