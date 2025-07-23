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
exports.hours2 = exports.hours1 = exports.shift2 = exports.shift1 = exports.job1 = exports.userInfo1 = exports.campaign = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
var date_fns_tz_1 = require("date-fns-tz");
var date_fns_1 = require("date-fns");
var createServer_1 = require("../../../test/createServer");
var App_1 = __importDefault(require("../../../App"));
var setupTests_1 = require("../../../setupTests");
exports.campaign = {
    mealsDonated: 100,
};
var user = {
    username: "chompy",
    id: "48yrf848fy48",
    admin: false,
    salesforceId: "d093900",
    active: true,
};
exports.userInfo1 = {
    firstName: "Testy",
    lastName: "Testorici",
    homeChefAgreement: true,
    volunteerAgreement: true,
    foodHandler: true,
    homeChefStatus: "Active",
    homeChefQuizPassed: true,
};
exports.job1 = {
    id: "7777",
    name: "Homies",
    shifts: ["1111", "2222"],
    active: true,
    location: "Location",
    ongoing: true,
    description: "kh",
    campaign: "wslejfn",
    region: "East Oakland",
};
exports.shift1 = {
    id: exports.job1.shifts[0],
    startTime: (0, date_fns_1.formatISO)((0, date_fns_1.addDays)(new Date(), 1)),
    open: true,
    job: exports.job1.id,
    restaurantMeals: false,
    duration: 3,
    slots: 3,
};
exports.shift2 = {
    id: exports.job1.shifts[1],
    startTime: (0, date_fns_1.formatISO)((0, date_fns_1.addDays)(new Date(), 2)),
    open: true,
    job: exports.job1.id,
    restaurantMeals: false,
    duration: 3,
    slots: 3,
};
exports.hours1 = {
    id: "d38ih3d",
    mealCount: "25",
    time: exports.shift1.startTime,
    job: exports.job1.id,
    status: "Confirmed",
    shift: exports.shift1.id,
    mealType: "Soup",
};
exports.hours2 = {
    id: "7tt7999",
    mealCount: "30",
    time: exports.shift2.startTime,
    job: exports.job1.id,
    status: "Confirmed",
    shift: exports.shift2.id,
    mealType: "Entree",
};
describe("not signed in", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/user/userInfo", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/volunteers/campaigns", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, []];
            }); }); } },
    ]);
    test("navigate to home chef page", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volunteersLink, homeChefLink, statusText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findAllByText("CK Volunteers")];
                case 1:
                    volunteersLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(volunteersLink[1])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText("Home Chef Volunteers")];
                case 3:
                    homeChefLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(homeChefLink)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/you must be signed in/i)];
                case 5:
                    statusText = _a.sent();
                    expect(statusText).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("signed in", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, user];
            }); }); } },
        { path: "/user/userInfo", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.userInfo1];
            }); }); } },
        { path: "/home-chef/campaign", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.campaign];
            }); }); } },
        {
            path: "/home-chef/job-listing",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ jobs: [exports.job1], shifts: [exports.shift1, exports.shift2] })];
            }); }); },
        },
        { path: "/home-chef/hours", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.hours1, exports.hours2]];
            }); }); } },
        { path: "/home-chef/hours", method: "post", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, exports.hours2];
            }); }); } },
    ]);
    test("see chef shifts", function () { return __awaiter(void 0, void 0, void 0, function () {
        var chefLink, upcomingShifts, hours;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText("See upcoming deliveries you've signed up for, and past deliveries you've made")];
                case 1:
                    chefLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(chefLink)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByRole("heading", {
                            name: "Upcoming Deliveries",
                        })];
                case 3:
                    upcomingShifts = _a.sent();
                    expect(upcomingShifts).toBeDefined();
                    hours = react_1.screen.getByText((0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(exports.hours1.time, "America/Los_Angeles"), "eee, M/d/yy"));
                    expect(hours).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test("sign up with list view", function () { return __awaiter(void 0, void 0, void 0, function () {
        var homeChefHome, signupLink, jobTitle, shiftDate, signupBtn, mealInput, submitBtn, confirmation, date, chefLink;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByAltText("home chef header")];
                case 1:
                    homeChefHome = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(homeChefHome)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText("Sign Up to Stock a Town Fridge")];
                case 3:
                    signupLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(signupLink)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(exports.job1.name)];
                case 5:
                    jobTitle = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(jobTitle)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText((0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(exports.shift1.startTime, "America/Los_Angeles"), "M/d/yy"))];
                case 7:
                    shiftDate = _a.sent();
                    expect(shiftDate).toBeDefined();
                    signupBtn = react_1.screen.getAllByRole("button", { name: "Sign Up" });
                    return [4 /*yield*/, user_event_1.default.click(signupBtn[1])];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByLabelText(/number of meals/i)];
                case 9:
                    mealInput = _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(mealInput, "30")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText("Sign Up")];
                case 11:
                    submitBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(submitBtn)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/confirmation/i)];
                case 13:
                    confirmation = _a.sent();
                    expect(confirmation).toBeDefined();
                    return [4 /*yield*/, react_1.screen.findByText(RegExp((0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(exports.hours2.time, "America/Los_Angeles"), "eeee, M/d/yy")))];
                case 14:
                    date = _a.sent();
                    expect(date).toBeDefined();
                    chefLink = react_1.screen.getByRole("button", {
                        name: "See your future and past shifts",
                    });
                    return [4 /*yield*/, user_event_1.default.click(chefLink)];
                case 15:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
