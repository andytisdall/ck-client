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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
var App_1 = __importDefault(require("../../../App"));
var setupTests_1 = require("../../../setupTests");
var createServer_1 = require("../../../test/createServer");
var adminUser = {
    username: 'bojee',
    id: 'failjrse48jf48',
    admin: true,
    salesforceId: 'f4s9jf4s9j',
    active: true,
};
var user = {
    username: 'chompy',
    id: '48yrf848fy48',
    admin: false,
    salesforceId: 'd093900',
    active: true,
};
describe('admin', function () {
    (0, createServer_1.createServer)([
        { path: '/user', res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, adminUser];
            }); }); } },
        { path: '/meal-program/restaurant', res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, null];
            }); }); } },
    ]);
    test('can see admin btns if admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var adminBtn, pushNotificationBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findAllByText(/admin/i)];
                case 1:
                    adminBtn = _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(adminBtn[0])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, react_1.screen.findByText(/send a push notification/i)];
                case 3:
                    pushNotificationBtn = _a.sent();
                    expect(pushNotificationBtn).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('not admin', function () {
    (0, createServer_1.createServer)([{ path: '/user', res: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, user];
            }); }); } }]);
    test('rejected if not admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var unauthorizedMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}), { wrapper: setupTests_1.Root });
                    return [4 /*yield*/, react_1.screen.findByText(/You must be an admin to access this page/i)];
                case 1:
                    unauthorizedMessage = _a.sent();
                    expect(unauthorizedMessage).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
});
