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
var react_router_dom_1 = require("react-router-dom");
require("./Volunteers.css");
var renderWithFallback_1 = __importDefault(require("../reusable/loading/renderWithFallback"));
var driverRouter_1 = __importDefault(require("./driver/driverRouter"));
var GetVolunteer = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./getVolunteer/GetVolunteer")); }); });
var Sign = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("../reusable/signature/Sign")); }); });
var SignSuccess = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("../reusable/signature/SignSuccess")); }); });
var VolunteersHome = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./VolunteersHome")); }); });
var ConfirmationBase = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./confirmation/ConfirmationBase")); }); });
var CampaignBase = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./CampaignBase")); }); });
var JobListBase = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./jobList/JobListBase")); }); });
var VolunteerCalendar = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./calendar/CalendarBase")); }); });
var ShiftSignup = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./signup/SignupBase")); }); });
var VolunteerSignInBase = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./VolunteerSignInBase")); }); });
var VolunteersBase = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main home-chef", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/volunteers", children: (0, jsx_runtime_1.jsx)("h1", { className: "volunteers-main-header", children: "CK Volunteers" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
};
var volunteersRouter = {
    path: "volunteers",
    element: (0, jsx_runtime_1.jsx)(VolunteersBase, {}),
    children: [
        { index: true, element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(VolunteersHome, {})) },
        {
            path: "confirm/:contactId/:hoursId",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(ConfirmationBase, {})),
        },
        driverRouter_1.default,
        {
            path: "signin/:campaignId",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(GetVolunteer, {})),
        },
        {
            path: "signup",
            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(VolunteerSignInBase, {})),
            children: [
                {
                    path: ":campaignId",
                    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(CampaignBase, {})),
                    children: [
                        {
                            index: true,
                            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(JobListBase, {})),
                        },
                        { path: "cal", element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(VolunteerCalendar, {})) },
                        {
                            path: ":shiftId",
                            element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(ShiftSignup, {})),
                        },
                    ],
                },
            ],
        },
        {
            path: "sign",
            children: [
                {
                    path: "success/:contactId/:hoursId",
                    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(SignSuccess, {})),
                },
                {
                    path: ":doc/:contactId/:hoursId",
                    element: (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(Sign, {})),
                },
            ],
        },
    ],
};
exports.default = volunteersRouter;
