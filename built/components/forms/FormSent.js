"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./Form.css");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var FormSent = function () {
    var state = (0, react_router_dom_1.useLocation)().state;
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        window.scrollTo({ top: 0 });
        if (state === null || state === void 0 ? void 0 : state.redirect) {
            setTimeout(function () {
                navigate(state.redirect);
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var renderMessage = function () {
        if (state === null || state === void 0 ? void 0 : state.message) {
            return (0, jsx_runtime_1.jsx)("p", { children: state.message });
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "form-background form-sent", children: (0, jsx_runtime_1.jsx)("div", { className: "form", children: (0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Your Submission Was Successful!" }), renderMessage(), (state === null || state === void 0 ? void 0 : state.redirect) ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "form-link", children: (0, jsx_runtime_1.jsx)("a", { href: "https://ckoakland.org", children: (0, jsx_runtime_1.jsx)("button", { children: "Go Back to the CK Home Page" }) }) }))] }) }) }));
};
exports.default = FormSent;
