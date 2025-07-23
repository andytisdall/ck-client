"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
require("./Orientation.css");
var OrientationSlides = function () {
    var renderSlides = function () {
        var images = [];
        for (var i = 1; i <= 19; i++) {
            images.push((0, jsx_runtime_1.jsx)("a", { href: "https://portal.ckoakland.org/images/home-chef/orientation-slides/slide-".concat(i, ".jpg"), children: (0, jsx_runtime_1.jsx)("img", { className: "orientation-slides", src: "/images/home-chef/orientation-slides/slide-".concat(i, ".jpg"), alt: "Slide ".concat(i, " from the last home chef orientation") }) }, "slide-".concat(i)));
        }
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: images });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Orientation Info Slides" }), (0, jsx_runtime_1.jsx)("div", { className: "orientation-slides-container", children: renderSlides() }), ' ', (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "..", children: (0, jsx_runtime_1.jsx)("button", { className: "nav-button", children: "Back to Onboarding" }) })] }));
};
exports.default = OrientationSlides;
