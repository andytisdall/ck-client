"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
require("./Orientation.css");
var VIDEO_FILE = 'https://storage.googleapis.com/coherent-vision-368820.appspot.com/Home%20Chef%20Orientation.mp4';
var OrientationVideo = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Home Chef Orientation" }), (0, jsx_runtime_1.jsx)("h3", { children: "Click the link below to take the home chef quiz when you're finished." }), (0, jsx_runtime_1.jsx)("div", { className: "orientation-video-container", children: (0, jsx_runtime_1.jsx)("video", { controls: true, className: "orientation-video", children: (0, jsx_runtime_1.jsx)("source", { src: VIDEO_FILE, type: "video/mp4" }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "..", children: (0, jsx_runtime_1.jsx)("button", { children: "Back to Onboarding" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../quiz", children: (0, jsx_runtime_1.jsx)("button", { children: "Take the Home Chef quiz" }) })] })] }));
};
exports.default = OrientationVideo;
