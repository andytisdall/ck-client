"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var DownloadFile_1 = __importDefault(require("../../reusable/file/DownloadFile"));
var PDF_FILE = 'home-chef/food-label-template.pdf';
var DOC_FILE = 'home-chef/food-label-template.docx';
var Labels = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Label Templates" }), (0, jsx_runtime_1.jsx)("p", { children: "Use this template with Avery 8463 shipping labels." }), (0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/food-label-example.jpeg", alt: "food label", className: "label-photo" }), (0, jsx_runtime_1.jsx)(DownloadFile_1.default, { filename: PDF_FILE, children: "Download the label template as a PDF" }), (0, jsx_runtime_1.jsx)(DownloadFile_1.default, { filename: DOC_FILE, children: "Download the label template as a Word file" })] }));
};
exports.default = Labels;
