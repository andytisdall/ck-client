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
//home chef onboarding
var HomeChefOnboarding = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./HomeChefOnboarding")); }); });
var UploadFoodHandler = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./UploadFoodHandler")); }); });
var OrientationVideo = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./OrientationVideo")); }); });
// documents
var FileSuccess = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("../../reusable/file/FileSuccess")); }); });
// quiz
var Quiz = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./quiz/Quiz")); }); });
var QuizResults = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./quiz/QuizResults")); }); });
var Sign = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("../../reusable/signature/Sign")); }); });
var SignSuccess = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("../../reusable/signature/SignSuccess")); }); });
var EmailAgreement = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./EmailAgreement")); }); });
var onboardingRouter = {
    path: "onboarding",
    children: [
        { index: true, element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(HomeChefOnboarding, {})) },
        {
            path: "quiz",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Quiz, {})),
        },
        {
            path: "quiz-results",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(QuizResults, {})),
        },
        {
            path: "orientation-video",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(OrientationVideo, {})),
        },
        {
            path: "upload-food-handler",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(UploadFoodHandler, {})),
        },
        {
            path: "file-success",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(FileSuccess, { returnLink: "/home-chef/onboarding" })),
        },
        { path: "emailAgreement", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(EmailAgreement, {})) },
        {
            path: "sign",
            children: [
                {
                    path: "success",
                    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(SignSuccess, { returnLink: "/home-chef/onboarding" })),
                },
                {
                    path: ":doc",
                    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Sign, {})),
                },
            ],
        },
    ],
};
exports.default = onboardingRouter;
