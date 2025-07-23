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
var HomeChefBase_1 = __importDefault(require("./HomeChefBase"));
require("./HomeChef.css");
require("./Confirmation.css");
var renderWithFallback_1 = __importDefault(require("../reusable/loading/renderWithFallback"));
var onboardingRouter_1 = __importDefault(require("./onboarding/onboardingRouter"));
var signupRouter_1 = __importDefault(require("./shiftSignup/signupRouter"));
var resourcesRouter_1 = __importDefault(require("./resources/resourcesRouter"));
var inviteRouter_1 = __importDefault(require("./invite/inviteRouter"));
var chefRouter_1 = __importDefault(require("./chef/chefRouter"));
var HomeChefHome = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./HomeChefHome')); }); });
var homeChefRouter = {
    path: 'home-chef',
    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(HomeChefBase_1.default, {})),
    children: [
        { index: true, element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(HomeChefHome, {})) },
        onboardingRouter_1.default,
        inviteRouter_1.default,
        signupRouter_1.default,
        chefRouter_1.default,
        resourcesRouter_1.default,
    ],
};
exports.default = homeChefRouter;
