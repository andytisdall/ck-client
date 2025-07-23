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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var textApi_1 = require("../../../state/apis/textApi");
var SearchPhone = function (_a) {
    var setSearchResult = _a.setSearchResult;
    var _b = __read((0, react_1.useState)(''), 2), number = _b[0], setNumber = _b[1];
    var _c = __read((0, react_1.useState)(false), 2), notFound = _c[0], setNotFound = _c[1];
    var _d = __read((0, textApi_1.useLazyGetPhoneNumberQuery)(), 2), getPhoneNumber = _d[0], getPhoneNumberResult = _d[1];
    return ((0, jsx_runtime_1.jsxs)("form", { className: "phone-form", onSubmit: function (e) {
            e.preventDefault();
            getPhoneNumber(number).then(function (_a) {
                var data = _a.data;
                if (data) {
                    setSearchResult(data);
                    setNumber('');
                }
                else {
                    setNotFound(true);
                }
            });
        }, children: [(0, jsx_runtime_1.jsx)("label", { children: "Find a number to remove:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: number, onChange: function (e) {
                    if (notFound) {
                        setNotFound(false);
                    }
                    setNumber(e.target.value);
                } }), !getPhoneNumberResult.isLoading ? (0, jsx_runtime_1.jsx)("input", { type: "submit" }) : (0, jsx_runtime_1.jsx)(Loading_1.default, {}), notFound && (0, jsx_runtime_1.jsx)("p", { children: "Phone Number Not Found." })] }));
};
exports.default = SearchPhone;
