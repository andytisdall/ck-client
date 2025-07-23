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
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var d4jApi_1 = require("../../state/apis/d4jApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var ConfirmEmail = function () {
    var code = (0, react_router_dom_1.useParams)().code;
    var _a = __read((0, d4jApi_1.useConfirmEmailMutation)(), 2), confirmEmail = _a[0], _b = _a[1], isSuccess = _b.isSuccess, isLoading = _b.isLoading, isError = _b.isError;
    (0, react_1.useEffect)(function () {
        if (code) {
            confirmEmail({ code: code });
        }
    }, [code, confirmEmail]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main user", children: [isLoading && (0, jsx_runtime_1.jsx)(Loading_1.default, {}), isSuccess && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Confirmation Successful!" }), (0, jsx_runtime_1.jsx)("p", { children: "You now have full access to the Dining for Justice app" })] })), isError && (0, jsx_runtime_1.jsx)("h4", { children: "Unable to verify" })] }));
};
exports.default = ConfirmEmail;
