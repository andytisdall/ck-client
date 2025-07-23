"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var CreateRestaurant_1 = __importDefault(require("./CreateRestaurant"));
var EditRestauant_1 = __importDefault(require("./EditRestauant"));
var Restaurant = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "create-main", children: [(0, jsx_runtime_1.jsx)(CreateRestaurant_1.default, {}), (0, jsx_runtime_1.jsx)(EditRestauant_1.default, {})] }));
};
exports.default = Restaurant;
