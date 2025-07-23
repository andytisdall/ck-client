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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
var App_1 = __importDefault(require("../../../App"));
var setupTests_1 = require("../../../setupTests");
var createServer_1 = require("../../../test/createServer");
var user = {
    username: "chompy",
    id: "48yrf848fy48",
    admin: false,
    salesforceId: "d093900",
    active: true,
};
var timeout = 8000;
describe("not signed in", function () {
    (0, createServer_1.createServer)([
        {
            path: "/user",
            res: function (req) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!__spreadArray([], __read(req.headers), false).length) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, user];
                });
            }); },
        },
        {
            path: "/signin",
            res: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { user: user, token: "token" }];
                });
            }); },
            method: "post",
        },
    ]);
    test("sign in button if not signed in", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    // home page
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            var unauthorizedMessage = react_1.screen.getByText(/Sign In/);
                            expect(unauthorizedMessage).toBeInTheDocument();
                        }, { timeout: timeout })];
                case 1:
                    // home page
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("can sign in", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userName, passwordInput, submitButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByPlaceholderText("Username")];
                case 1:
                    userName = _a.sent();
                    passwordInput = react_1.screen.getByPlaceholderText("Password");
                    return [4 /*yield*/, user_event_1.default.type(userName, "Test")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.type(passwordInput, "Password")];
                case 3:
                    _a.sent();
                    submitButton = react_1.screen.getByRole("button", { name: "Submit" });
                    return [4 /*yield*/, user_event_1.default.click(submitButton)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            react_1.screen.getByText(user.username);
                        }, { timeout: timeout })];
                case 5:
                    _a.sent();
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
        {
            path: "/signin",
            res: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { user: user, token: "token" }];
                });
            }); },
        },
        { path: "/meal-program/restaurant", res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
    ]);
    test("username if signed in", function () { return __awaiter(void 0, void 0, void 0, function () {
        var username;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(user.username)];
                case 1:
                    username = _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(username).toBeInTheDocument();
                        }, { timeout: timeout })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
