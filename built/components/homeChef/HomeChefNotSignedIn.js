"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var HomeChefNotSignedIn = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "home-chef-announcement", children: (0, jsx_runtime_1.jsx)("strong", { children: "You must be signed in to access this page." }) }), (0, jsx_runtime_1.jsx)("h3", { children: "If you have a username:" }), (0, jsx_runtime_1.jsx)("p", { children: "Thank you for becoming a CK Home Chef! Please log in with your credentials to begin the orientation and onboarding process or to access your account." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h3", { children: "If not:" }), (0, jsx_runtime_1.jsxs)("p", { children: ["To become a Home Chef,", ' ', (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/forms/volunteer", className: "retro-link", children: "please complete the signup form." }), (0, jsx_runtime_1.jsx)("br", {}), "Once you submit the form, you will be given a username so you can access this portal."] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../volunteers", className: "retro-link", children: (0, jsx_runtime_1.jsx)("strong", { children: "Other volunteer opportunities" }) })] }));
};
exports.default = HomeChefNotSignedIn;
