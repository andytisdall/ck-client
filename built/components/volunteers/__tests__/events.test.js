"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.volunteer1 = exports.hours2 = exports.hours = exports.eventCampaign = exports.shift1 = exports.job1 = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
var date_fns_tz_1 = require("date-fns-tz");
var date_fns_1 = require("date-fns");
var createServer_1 = require("../../../test/createServer");
var App_1 = __importDefault(require("../../../App"));
var setupTests_1 = require("../../../setupTests");
exports.job1 = {
    id: "398y",
    name: "Meal Prep",
    shifts: [],
    active: true,
    location: "Location",
    ongoing: true,
    description: "kh",
    campaign: "wslejfn",
    region: "East Oakland",
};
exports.shift1 = {
    id: "383u8e78",
    startTime: (0, date_fns_1.formatISO)((0, date_fns_1.addDays)(new Date(), 1)),
    open: true,
    job: exports.job1.id,
    restaurantMeals: false,
    duration: 3,
    slots: 3,
};
exports.job1.shifts = [exports.shift1];
exports.eventCampaign = {
    name: "Holiday Cookies",
    id: "dw3h87hd8",
    buttonText: "dkuhewd",
    startDate: (0, date_fns_1.formatISO)(new Date()),
};
exports.hours = {
    id: "f4397h",
    time: exports.shift1.startTime,
    job: exports.job1.id,
    status: "Confirmed",
    shift: exports.shift1.id,
    campaign: "dw3h87",
};
exports.hours2 = {
    id: "fdw4df",
    time: exports.shift1.startTime,
    job: exports.job1.id,
    status: "Canceled",
    shift: exports.shift1.id,
};
exports.volunteer1 = {
    id: "0037400000FU7XrAAL",
    householdId: "0017400000IG2QzAAL",
    portalUsername: undefined,
    firstName: "Andrew",
    name: "Andrew Tisdall",
    volunteerAgreement: true,
    email: "andrew@ck.com",
};
var timeout = 8000;
describe("volunteer does not exist already", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/volunteers/campaigns", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.eventCampaign]];
            }); }); } },
        {
            path: "/volunteers/jobs/:campaignId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.job1]];
            }); }); },
        },
        { path: "/volunteers/:email", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/user/userInfo", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/volunteers", method: "post", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.volunteer1];
            }); }); } },
        {
            path: "/volunteers/hours/:campaignId/:contactId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.hours, exports.hours2]];
            }); }); },
        },
        {
            path: "/volunteers/jobs/:campaignId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.job1]];
            }); }); },
        },
    ]);
    test("navigate to volunteers home", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volLink;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findAllByText("CK Volunteers")];
                case 1:
                    volLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(volLink[1])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            react_1.screen.getByText("Special Event Volunteer Opportunities");
                        }, { timeout: timeout })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create contact", function () { return __awaiter(void 0, void 0, void 0, function () {
        var eventLink, email, emailInput, firstNameInputLabel, lastNameInputLabel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(exports.eventCampaign.name)];
                case 1:
                    eventLink = _a.sent();
                    user_event_1.default.click(eventLink);
                    email = "andrew@gmail.com";
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            emailInput = react_1.screen.getByText("Email:");
                        })];
                case 2:
                    _a.sent();
                    if (!emailInput) return [3 /*break*/, 5];
                    return [4 /*yield*/, user_event_1.default.click(emailInput)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(emailInput, email + "[Enter]")];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, react_1.waitFor)(function () {
                        var firstNameInputLabel = react_1.screen.getByText("First Name:");
                        expect(firstNameInputLabel).toBeDefined();
                    })];
                case 6:
                    _a.sent();
                    firstNameInputLabel = react_1.screen.getByText("First Name:");
                    lastNameInputLabel = react_1.screen.getByText("Last Name:");
                    return [4 /*yield*/, user_event_1.default.type(firstNameInputLabel, "New")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(lastNameInputLabel, "User[Enter]")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(RegExp(exports.eventCampaign.name))];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("volunteer found", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/volunteers/campaigns", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.eventCampaign]];
            }); }); } },
        {
            path: "/volunteers/jobs/:campaignId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.job1]];
            }); }); },
        },
        { path: "/volunteers/:email", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.volunteer1];
            }); }); } },
        { path: "/user/userInfo", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        {
            path: "/volunteers/hours/:campaignId/:contactId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, []];
            }); }); },
        },
        {
            path: "/volunteers/hours/:campaignId/",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, []];
            }); }); },
        },
        {
            path: "/volunteers/hours/:campaignId/:contactId",
            method: "delete",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); },
        },
        { path: "/volunteers/hours", method: "post", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.hours];
            }); }); } },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
        { path: "sign/CKK/:idd/:id", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); }); } },
        {
            path: "/volunteers/jobs/:campaignId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.job1]];
            }); }); },
        },
        {
            path: "/volunteers/hour/:hoursId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.hours];
            }); }); },
        },
    ]);
    test("get job info and sign up for shift", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jobLink, jobName, confirmSignup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText((0, date_fns_tz_1.format)(new Date(exports.hours.time), "eee, M/d/yy"))];
                case 2:
                    jobLink = _a.sent();
                    expect(jobLink).toBeDefined();
                    return [4 /*yield*/, user_event_1.default.click(jobLink)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(exports.job1.name)];
                case 4:
                    jobName = _a.sent();
                    expect(jobName).toBeDefined();
                    return [4 /*yield*/, react_1.screen.findByText("Confirm Signup")];
                case 5:
                    confirmSignup = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(confirmSignup)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("cancel job signup", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cancelBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/cancel/i)];
                case 1:
                    cancelBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(cancelBtn)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("canceled hours", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/volunteers/campaigns", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.eventCampaign]];
            }); }); } },
        {
            path: "/volunteers/jobs/:campaignId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.job1]];
            }); }); },
        },
        { path: "/user/userInfo", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        {
            path: "/volunteers/hour/:hoursId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (__assign(__assign({}, exports.hours), { status: "Canceled" }))];
            }); }); },
        },
    ]);
    test("see canceled hours", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cancelMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText("You have canceled this shift:")];
                case 1:
                    cancelMsg = _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(cancelMsg).toBeDefined();
                        }, { timeout: timeout })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
