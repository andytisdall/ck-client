"use strict";
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
exports.volunteer1 = exports.hours = exports.ckDoorCampaign = exports.ckKitchenCampaign = exports.shift2 = exports.shift1 = exports.job1 = void 0;
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
    id: "4i3ghd",
    startTime: (0, date_fns_1.formatISO)((0, date_fns_1.addDays)(new Date(), 1)),
    open: true,
    job: exports.job1.id,
    restaurantMeals: false,
    duration: 3,
    slots: 3,
};
exports.shift2 = {
    id: "dei8hdew",
    startTime: (0, date_fns_1.formatISO)((0, date_fns_1.addDays)(new Date(), 2)),
    open: false,
    job: exports.job1.id,
    restaurantMeals: false,
    duration: 3,
    slots: 0,
};
exports.job1.shifts = [exports.shift1, exports.shift2];
exports.ckKitchenCampaign = {
    name: "CK Kitchen Volunteers",
    id: "dewneic",
};
exports.ckDoorCampaign = {
    name: "Door Distribution",
    id: "dfli",
};
exports.hours = {
    id: "f4397h",
    time: exports.shift1.startTime,
    job: exports.job1.id,
    status: "Confirmed",
    shift: exports.shift1.id,
    campaign: exports.ckKitchenCampaign.id,
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
describe("volunteer not found", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        {
            path: "/volunteers/campaigns",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.ckKitchenCampaign, exports.ckDoorCampaign]];
            }); }); },
        },
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
                return [2 /*return*/, [exports.hours]];
            }); }); },
        },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
    ]);
    test("navigate to CK Kitchen home", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volLink, headerText;
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
                    return [4 /*yield*/, react_1.screen.findByRole("heading", {
                            level: 1,
                            name: "CK Volunteers",
                        })];
                case 3:
                    headerText = _a.sent();
                    expect(headerText).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create contact and see list of jobs", function () { return __awaiter(void 0, void 0, void 0, function () {
        var kitchenLink, email, emailInput, firstNameInputLabel, lastNameInputLabel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText("CK Kitchen Volunteers")];
                case 1:
                    kitchenLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(kitchenLink)];
                case 2:
                    _a.sent();
                    email = "andrew@gmail.com";
                    return [4 /*yield*/, react_1.screen.findByText("Email:")];
                case 3:
                    emailInput = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(emailInput)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(emailInput, email + "[Enter]")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
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
                    setTimeout(function () {
                        user_event_1.default.type(lastNameInputLabel, "User[Enter]");
                    }, 50);
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            var jobName = react_1.screen.getByText("Positions Available");
                            expect(jobName).toBeDefined();
                        })];
                case 8:
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
        {
            path: "/volunteers/campaigns",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.ckKitchenCampaign, exports.ckDoorCampaign]];
            }); }); },
        },
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
            path: "/volunteers/hours",
            method: "post",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.hours];
            }); }); },
        },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
        { path: "/sign/CKK/:idd/:id", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); }); } },
    ]);
    test("get job info and sign up for shift", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jobLink, jobName, confirmSignup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText((0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(exports.hours.time, "America/Los_Angeles"), "eee, M/d/yy"))];
                case 1:
                    jobLink = _a.sent();
                    expect(jobLink).toBeDefined();
                    return [4 /*yield*/, user_event_1.default.click(jobLink)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(exports.job1.name)];
                case 3:
                    jobName = _a.sent();
                    expect(jobName).toBeDefined();
                    return [4 /*yield*/, react_1.screen.findByText("Confirm Signup")];
                case 4:
                    confirmSignup = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(confirmSignup)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("signed up for shift", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        {
            path: "/volunteers/campaigns",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.ckKitchenCampaign, exports.ckDoorCampaign]];
            }); }); },
        },
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
            path: "/volunteers/hours/:campaignId/",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, []];
            }); }); },
        },
        {
            path: "/volunteers/hours/:campaignId/:contactId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.hours]];
            }); }); },
        },
        {
            path: "/volunteers/hour/:hoursId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.hours];
            }); }); },
        },
        {
            path: "/volunteers/hours/:campaignId/:contactId",
            method: "delete",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); },
        },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
    ]);
    test("see signed up shift", function () { return __awaiter(void 0, void 0, void 0, function () {
        var confirmationMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText("You have successfully signed up for this shift:")];
                case 1:
                    confirmationMsg = _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(confirmationMsg).toBeDefined();
                        }, { timeout: 500 })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("cancel job signup", function () { return __awaiter(void 0, void 0, void 0, function () {
        var backBtn, calLink, jobLink, cancelBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/back/i)];
                case 1:
                    backBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(backBtn)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/calendar/i)];
                case 3:
                    calLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(calLink)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/signed up/i)];
                case 5:
                    jobLink = _a.sent();
                    expect(jobLink).toBeDefined();
                    return [4 /*yield*/, user_event_1.default.click(jobLink)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText("Cancel Your Booked Volunteer Time")];
                case 7:
                    cancelBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(cancelBtn)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
