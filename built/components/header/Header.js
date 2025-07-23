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
require("./Header.css");
var HeaderMenu_1 = __importDefault(require("./HeaderMenu"));
var Navigation_1 = __importDefault(require("./Navigation"));
var Header = function () {
    var _a = __read((0, react_1.useState)(window.innerWidth > 600), 2), menuOpen = _a[0], setMenuOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "header", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsx)("img", { src: "/images/logos/ck-logo.png", alt: "ck logo", className: "header-logo" }) }), (0, jsx_runtime_1.jsx)(HeaderMenu_1.default, { setMenuOpen: setMenuOpen, menuOpen: menuOpen })] }), menuOpen && (0, jsx_runtime_1.jsx)(Navigation_1.default, {}), (0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) })] }));
};
exports.default = Header;
