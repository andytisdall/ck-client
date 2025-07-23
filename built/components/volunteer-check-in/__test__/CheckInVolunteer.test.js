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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
var App_1 = __importDefault(require("../../../App"));
var Root_1 = __importDefault(require("../../../Root"));
var createServer_1 = require("../../../test/createServer");
var adminUser = {
    username: "bojee",
    id: "failjrse48jf48",
    admin: true,
    salesforceId: "f4s9jf4s9j",
    active: true,
};
var volunteer1 = {
    hoursId: "iow84hy",
    contactId: "w8hrc",
    firstName: "Jamie",
    lastName: "Lannister",
    email: "m.com",
    volunteerAgreement: true,
    status: "Confirmed",
};
var volunteer2 = {
    hoursId: "3wf4",
    contactId: "dih",
    firstName: "Ned",
    lastName: "Stark",
    email: "mo.com",
    volunteerAgreement: false,
    status: "Confirmed",
};
var newVolunteer = {
    email: "somthing@e.com",
    id: volunteer1.contactId,
    householdId: "dwo8hd",
    volunteerAgreement: false,
};
describe("volunteer not checked in", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, adminUser];
            }); }); } },
        {
            path: "/volunteers/check-in/shifts",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [{ id: "3o8dh", job: "CK Kitchen" }]];
            }); }); },
        },
        {
            path: "/volunteers/check-in/:shiftId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [volunteer1, volunteer2]];
            }); }); },
        },
        { path: "/volunteers/check-in", method: "post", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: true })];
            }); }); } },
    ]);
    test("See today's volunteers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var adminBtn, volunteerCheckInBtn, kitchenBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, react_1.screen.findAllByText(/admin/i)];
                case 1:
                    adminBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(adminBtn[0])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/volunteer check-in/i)];
                case 3:
                    volunteerCheckInBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(volunteerCheckInBtn)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/kitchen/i)];
                case 5:
                    kitchenBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(kitchenBtn)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Check in volunteer", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volunteer1Btn, checkInBtn, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, react_1.screen.findByRole("link", {
                            name: RegExp(volunteer1.lastName),
                        })];
                case 1:
                    volunteer1Btn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(volunteer1Btn)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/check in/i)];
                case 3:
                    checkInBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(checkInBtn)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/successfully/i)];
                case 5:
                    success = _a.sent();
                    expect(success).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("volunteer is checked in", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, adminUser];
            }); }); } },
        {
            path: "/volunteers/check-in/shifts",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [{ id: "3o8dh", job: "CK Kitchen" }]];
            }); }); },
        },
        {
            path: "/volunteers/check-in/:shiftId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [__assign(__assign({}, volunteer1), { status: "Completed" }), volunteer2]];
            }); }); },
        },
        { path: "/volunteers/check-in", method: "post", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
    ]);
    test("See checked in volunteer", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volunteer1Btn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, (0, react_1.waitFor)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var volunteer1Name;
                            return __generator(this, function (_a) {
                                volunteer1Name = react_1.screen.getByText(RegExp(volunteer1.lastName));
                                expect(volunteer1Name).toBeInTheDocument();
                                return [2 /*return*/];
                            });
                        }); }, { timeout: 3500 })];
                case 1:
                    _a.sent();
                    volunteer1Btn = react_1.screen.queryByRole("link", {
                        name: RegExp(volunteer1.lastName),
                    });
                    expect(volunteer1Btn).not.toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("agreement not signed and limit not reached", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, adminUser];
            }); }); } },
        {
            path: "/volunteers/check-in/shifts",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [{ id: "3o8dh", job: "CK Kitchen" }]];
            }); }); },
        },
        {
            path: "/volunteers/check-in/:shiftId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [volunteer1, volunteer2]];
            }); }); },
        },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
    ]);
    test("prompted to sign", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volunteer1Btn, signLink, startOverBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, react_1.screen.findByRole("link", {
                            name: RegExp(volunteer2.lastName),
                        })];
                case 1:
                    volunteer1Btn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(volunteer1Btn)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/sign the agreement/i)];
                case 3:
                    signLink = _a.sent();
                    expect(signLink).toBeInTheDocument();
                    return [4 /*yield*/, react_1.screen.findByText(/start over/i)];
                case 4:
                    startOverBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(startOverBtn)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("agreement not signed and limit reached", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, adminUser];
            }); }); } },
        {
            path: "/volunteers/check-in/shifts",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [{ id: "3o8dh", job: "CK Kitchen" }]];
            }); }); },
        },
        {
            path: "/volunteers/check-in/:shiftId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [volunteer1, volunteer2]];
            }); }); },
        },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: true })];
            }); }); } },
    ]);
    test("not prompted to sign", function () { return __awaiter(void 0, void 0, void 0, function () {
        var volunteer1Btn, checkInBtn, startOverBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, react_1.screen.findByRole("link", {
                            name: RegExp(volunteer2.lastName),
                        })];
                case 1:
                    volunteer1Btn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(volunteer1Btn)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/check in/i)];
                case 3:
                    checkInBtn = _a.sent();
                    expect(checkInBtn).toBeInTheDocument();
                    startOverBtn = react_1.screen.getByText(/start over/i);
                    return [4 /*yield*/, user_event_1.default.click(startOverBtn)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("volunteer not on list and not in salesforce", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, adminUser];
            }); }); } },
        {
            path: "/volunteers/check-in/shifts",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [{ shiftId: "d3i7h", job: "CK Kitchen" }]];
            }); }); },
        },
        {
            path: "/volunteers/check-in/:shiftId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [volunteer1, volunteer2]];
            }); }); },
        },
        { path: "/volunteers/:email", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
        {
            path: "/volunteers",
            method: "post",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, newVolunteer];
            }); }); },
        },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
        {
            path: "/volunteers/check-in/hours",
            method: "post",
            res: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, ({
                            id: "kuh",
                        })];
                });
            }); },
        },
    ]);
    test("create a new contact", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newVolunteerBtn, firstNameField, lastNameField, emailField, submitBtn, signLink, startOverBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, react_1.screen.findByText(/new volunteer/i)];
                case 1:
                    newVolunteerBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(newVolunteerBtn)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByLabelText(/first name/i)];
                case 3:
                    firstNameField = _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(firstNameField, "FirstName")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByLabelText(/last name/i)];
                case 5:
                    lastNameField = _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(lastNameField, "LastName")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByLabelText(/email/i)];
                case 7:
                    emailField = _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(emailField, "Email@gmail.com")];
                case 8:
                    _a.sent();
                    submitBtn = react_1.screen.getByRole("button", { name: /submit/i });
                    return [4 /*yield*/, user_event_1.default.click(submitBtn)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/sign the agreement/i)];
                case 10:
                    signLink = _a.sent();
                    expect(signLink).toBeInTheDocument();
                    startOverBtn = react_1.screen.getByText(/start over/i);
                    return [4 /*yield*/, user_event_1.default.click(startOverBtn)];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("volunteer not on list but does exist in salesforce", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, adminUser];
            }); }); } },
        {
            path: "/volunteers/check-in/shifts",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [{ shiftId: "d3i7h", job: "CK Kitchen" }]];
            }); }); },
        },
        {
            path: "/volunteers/check-in/:shiftId",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, [volunteer1, volunteer2]];
            }); }); },
        },
        { path: "/volunteers/:email", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, newVolunteer];
            }); }); } },
        { path: "/sign/config", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ limitReached: false })];
            }); }); } },
        {
            path: "/volunteers/check-in/hours",
            method: "post",
            res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ id: "kjh" })];
            }); }); },
        },
    ]);
    test("find existing contact", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newVolunteerBtn, firstNameField, lastNameField, emailField, submitBtn, signLink;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, react_1.screen.findByText(/new volunteer/i)];
                case 1:
                    newVolunteerBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(newVolunteerBtn)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByLabelText(/first name/i)];
                case 3:
                    firstNameField = _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(firstNameField, "FirstName")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByLabelText(/last name/i)];
                case 5:
                    lastNameField = _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(lastNameField, "LastName")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByLabelText(/email/i)];
                case 7:
                    emailField = _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(emailField, "Email@gmail.com")];
                case 8:
                    _a.sent();
                    submitBtn = react_1.screen.getByRole("button", { name: /submit/i });
                    return [4 /*yield*/, user_event_1.default.click(submitBtn)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/sign the agreement/i)];
                case 10:
                    signLink = _a.sent();
                    expect(signLink).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("not authorized", function () {
    (0, createServer_1.createServer)([
        { path: "/user", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (__assign(__assign({}, adminUser), { admin: false }))];
            }); }); } },
    ]);
    test("Unauthorized if not admin", function () { return __awaiter(void 0, void 0, void 0, function () {
        var permission;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: Root_1.default });
                    return [4 /*yield*/, react_1.screen.findByText(/permission/i)];
                case 1:
                    permission = _a.sent();
                    expect(permission).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
});
