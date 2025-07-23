"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var RadioFormItem_1 = __importDefault(require("./RadioFormItem"));
var RadioFormSet = function (_a) {
    var name = _a.name, setValue = _a.setValue, question = _a.question, language = _a.language;
    var options = question.options ? question.options[language] : [true, false];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: question[language] }), options.map(function (option, index) { return ((0, jsx_runtime_1.jsx)(RadioFormItem_1.default, { value: option, setValue: function () { var _a; return setValue(((_a = question.options) === null || _a === void 0 ? void 0 : _a.English[index]) || option); }, name: name, id: "".concat(name, "-").concat(index), language: language }, "".concat(name, "-").concat(index))); })] }));
};
exports.default = RadioFormSet;
