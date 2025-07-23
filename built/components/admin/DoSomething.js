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
// import serverCall from 'state'
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var authApi_1 = require("../../state/apis/authApi");
var DoSomething = function () {
    var _a = __read((0, authApi_1.useTestEmailMutation)(), 2), doSomething = _a[0], _b = _a[1], isLoading = _b.isLoading, isError = _b.isError, data = _b.data, isSuccess = _b.isSuccess;
    return ((0, jsx_runtime_1.jsx)("div", { children: isError ? ("Error") : isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : isSuccess ? ("".concat(data)) : ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return doSomething(); }, children: "Do the Thing" })) }));
};
exports.default = DoSomething;
