"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var renderWithFallback_1 = __importDefault(require("../../reusable/loading/renderWithFallback"));
require("./Driver.css");
var License = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./License")); }); });
var Car = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./Car")); }); });
var Insurance = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./Insurance")); }); });
var Sign = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("../../reusable/signature/Sign")); }); });
var SignSuccess = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("../../reusable/signature/SignSuccess")); }); });
var OnboardingHome = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./OnboardingHome")); }); });
var OnboardingBase = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./OnboardingBase")); }); });
var driverRouter = {
    path: "driver-onboarding",
    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(OnboardingBase, {})),
    children: [
        { index: true, element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(OnboardingHome, {})) },
        { path: "license", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(License, {})) },
        { path: "insurance", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Insurance, {})) },
        { path: "car", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Car, {})) },
        {
            path: "sign",
            children: [
                {
                    path: "success",
                    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(SignSuccess, { returnLink: "../.." })),
                },
                { path: ":doc", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Sign, {})) },
            ],
        },
    ],
};
exports.default = driverRouter;
