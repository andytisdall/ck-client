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
exports.driversCampaign = exports.ckKitchenCampaign = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
var date_fns_tz_1 = require("date-fns-tz");
var date_fns_1 = require("date-fns");
var createServer_1 = require("../../../test/createServer");
var App_1 = __importDefault(require("../../../App"));
var setupTests_1 = require("../../../setupTests");
var config_1 = __importDefault(require("../config"));
var userInfo = {
    firstName: "Andy",
    lastName: "Tisdall",
    volunteerAgreement: true,
    foodHandler: true,
    homeChefAgreement: false,
    homeChefQuizPassed: false,
};
exports.ckKitchenCampaign = {
    name: "CK Kitchen Volunteers",
    id: "dewneic",
};
exports.driversCampaign = {
    name: "Drivers",
    id: config_1.default.deliveryDrivers.id,
};
var user = {
    username: "Andy",
    admin: false,
    active: true,
    salesforceId: "dfuehcfd",
    id: "oseifhjwosiefjc",
};
var driverJob = {
    name: "Job 1",
    id: "eijfd",
    active: true,
    ongoing: true,
    campaign: exports.driversCampaign.id,
    shifts: [],
    location: "CK Kitchen",
};
var driverShift = {
    startTime: (0, date_fns_1.formatISO)((0, date_fns_1.addDays)(new Date(), 1)),
    id: "cidhc",
    open: true,
    job: driverJob.id,
    duration: 3,
    slots: 1,
    distance: "5 mi",
    destination: "EOC",
    carSizeRequired: "Small",
};
driverJob.shifts = [driverShift];
var driver = {
    volunteerAgreement: false,
    car: {},
};
var onboardedDriver = {
    volunteerAgreement: true,
    car: {
        size: "Medium",
        make: "Honda",
        model: "HR-V",
        year: "2021",
        color: "black",
    },
    insuranceExpiration: (0, date_fns_1.formatISO)((0, date_fns_1.addYears)(new Date(), 1)),
    licenseExpiration: (0, date_fns_1.formatISO)((0, date_fns_1.addYears)(new Date(), 1)),
    driverStatus: "Active",
};
var newHour = {
    id: "aflkjefhc",
    time: driverShift.startTime,
    job: driverJob.id,
    status: "Confirmed",
    shift: driverShift.id,
    campaign: exports.driversCampaign.id.substring(0, exports.driversCampaign.id.length - 2),
};
describe("no user", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        {
            path: "/volunteers/campaigns",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.ckKitchenCampaign, exports.driversCampaign]];
            }); }); },
        },
        { path: "/volunteers/driver", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
    ]);
    test("rejected", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volunteerLinks, driverLink, noUserText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findAllByText(/ck volunteers/i)];
                case 1:
                    volunteerLinks = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(volunteerLinks[1])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/drivers/i)];
                case 3:
                    driverLink = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(driverLink)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/register as a volunteer here/i)];
                case 5:
                    noUserText = _a.sent();
                    expect(noUserText).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("onboarding", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, user];
            }); }); } },
        {
            path: "/volunteers/hours/:campaignId/:contactId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, []];
            }); }); },
        },
        {
            path: "/volunteers/campaigns",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.ckKitchenCampaign, exports.driversCampaign]];
            }); }); },
        },
        { path: "/volunteers/driver", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, driver];
            }); }); } },
        { path: "/sign/DRV", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({})];
            }); }); } },
        {
            path: "/volunteers/jobs/:campaignId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [driverJob]];
            }); }); },
        },
    ]);
    test("go to onboarding home", function () { return __awaiter(void 0, void 0, void 0, function () {
        var onboardingText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/You must complete onboardin/i)];
                case 1:
                    onboardingText = _a.sent();
                    expect(onboardingText).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test("upload license", function () { return __awaiter(void 0, void 0, void 0, function () {
        var licenseText, fileText, back;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/license/i)];
                case 1:
                    licenseText = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(licenseText)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/choose file/i)];
                case 3:
                    fileText = _a.sent();
                    expect(fileText).toBeDefined();
                    return [4 /*yield*/, react_1.screen.findByText(/back/i)];
                case 4:
                    back = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(back)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("upload insurance", function () { return __awaiter(void 0, void 0, void 0, function () {
        var licenseText, fileText, back;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/insurance/i)];
                case 1:
                    licenseText = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(licenseText)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/choose file/i)];
                case 3:
                    fileText = _a.sent();
                    expect(fileText).toBeDefined();
                    return [4 /*yield*/, react_1.screen.findByText(/back/i)];
                case 4:
                    back = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(back)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("sign agreement", function () { return __awaiter(void 0, void 0, void 0, function () {
        var agreementText, documentText, backText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/agreement/i)];
                case 1:
                    agreementText = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(agreementText)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/document/i)];
                case 3:
                    documentText = _a.sent();
                    expect(documentText).toBeDefined();
                    backText = react_1.screen.getByText(/back/i);
                    return [4 /*yield*/, user_event_1.default.click(backText)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("enter car info", function () { return __awaiter(void 0, void 0, void 0, function () {
        var carText, sizeText, back;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/vehicle/i)];
                case 1:
                    carText = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(carText)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/Enter your vehicle's information/i)];
                case 3:
                    sizeText = _a.sent();
                    expect(sizeText).toBeDefined();
                    back = react_1.screen.getByText(/back/i);
                    return [4 /*yield*/, user_event_1.default.click(back)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("sign up", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, user];
            }); }); } },
        { path: "/user/userInfo", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, userInfo];
            }); }); } },
        {
            path: "/volunteers/campaigns",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [exports.ckKitchenCampaign, exports.driversCampaign]];
            }); }); },
        },
        { path: "/volunteers/driver", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, onboardedDriver];
            }); }); } },
        { path: "/sign/DRV", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({})];
            }); }); } },
        {
            path: "/volunteers/jobs/:campaignId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [driverJob]];
            }); }); },
        },
        {
            path: "/volunteers/hours/:campaignId/:contactId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, []];
            }); }); },
        },
        {
            path: "/volunteers/hours/:contactId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, []];
            }); }); },
        },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
        {
            path: "/volunteers/hours",
            method: "post",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, newHour];
            }); }); },
        },
        { path: "/volunteers/hour/:hourId", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, newHour];
            }); }); } },
        {
            path: "/volunteers/hours/:hoursId/:contactId",
            method: "delete",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); },
        },
    ]);
    test("onboarding complete", function () { return __awaiter(void 0, void 0, void 0, function () {
        var readyText, continueBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/You are ready to transport/i)];
                case 1:
                    readyText = _a.sent();
                    expect(readyText).toBeDefined();
                    continueBtn = react_1.screen.getByText(/continue/i);
                    return [4 /*yield*/, user_event_1.default.click(continueBtn)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("find job list", function () { return __awaiter(void 0, void 0, void 0, function () {
        var date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(RegExp((0, date_fns_tz_1.format)(new Date(driverShift.startTime), "eee, M/d/yy")))];
                case 1:
                    date = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(date)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("sign up for shift", function () { return __awaiter(void 0, void 0, void 0, function () {
        var distanceText, signupBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(driverShift.destination)];
                case 1:
                    distanceText = _a.sent();
                    expect(distanceText).toBeDefined();
                    signupBtn = react_1.screen.getByText(/Confirm Signup/i);
                    return [4 /*yield*/, user_event_1.default.click(signupBtn)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("confirm shift", function () { return __awaiter(void 0, void 0, void 0, function () {
        var confirmText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/You have successfully signed up for this shift/i)];
                case 1:
                    confirmText = _a.sent();
                    expect(confirmText).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test("cancel shift", function () { return __awaiter(void 0, void 0, void 0, function () {
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
