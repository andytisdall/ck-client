"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./FridgeMap.css");
var GOOGLE_MAP_URL = 'https://www.google.com/maps/d/embed?mid=1Y5Jf-_hOU2OHTTkcua8SZOvUPvj3jv90';
var FridgeMap = function () {
    return ((0, jsx_runtime_1.jsx)("iframe", { src: GOOGLE_MAP_URL, className: "fridge-map", title: "Town Fridge Google Map" }));
};
exports.default = FridgeMap;
