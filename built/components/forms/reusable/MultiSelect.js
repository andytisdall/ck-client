"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var MultiSelectItem_1 = __importDefault(require("./MultiSelectItem"));
var MultiSelectSet = function (_a) {
    var setValue = _a.setValue, question = _a.question, label = _a.label, language = _a.language;
    var options = question.options[language];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("label", { children: label }), options.map(function (option, index) { return ((0, jsx_runtime_1.jsx)(MultiSelectItem_1.default, { value: option, addValue: function () {
                    return setValue(function (current) { return __spreadArray(__spreadArray([], __read(current), false), [
                        question.options.English[index],
                    ], false); });
                }, removeValue: function () {
                    return setValue(function (current) {
                        return current.filter(function (val) { return val !== question.options.English[index]; });
                    });
                }, id: "".concat(label, "-").concat(index) }, "".concat(label, "-").concat(index))); })] }));
};
exports.default = MultiSelectSet;
