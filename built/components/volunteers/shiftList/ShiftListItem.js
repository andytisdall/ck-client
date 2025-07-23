"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var config_1 = __importDefault(require("../config"));
var DriverShiftListItemInfo_1 = __importDefault(require("./DriverShiftListItemInfo"));
var ShiftListItemInfo_1 = __importDefault(require("./ShiftListItemInfo"));
var driver_1 = require("../../../state/apis/volunteerApi/driver");
var formatDateTime_1 = require("../formatDateTime");
var ShiftListItem = function (_a) {
    var shift = _a.shift, bookedHoursId = _a.bookedHoursId, contactId = _a.contactId, campaign = _a.campaign;
    var driver = (0, driver_1.useGetDriverQuery)().data;
    var linkUrl = "";
    if (bookedHoursId) {
        linkUrl = "../../confirm/".concat(contactId, "/").concat(bookedHoursId);
    }
    else if (shift.open) {
        linkUrl = shift.id;
    }
    var driverCampaign = campaign.id === config_1.default.deliveryDrivers.id;
    var isAvailable = shift.open || bookedHoursId ? true : false;
    if (driverCampaign) {
        var carIsBigEnough = (0, formatDateTime_1.isCarBigEnough)({
            requirement: shift.carSizeRequired,
            userCar: driver === null || driver === void 0 ? void 0 : driver.car.size,
        });
        var disabled = !bookedHoursId && !carIsBigEnough;
        isAvailable = isAvailable && !disabled;
    }
    var Component = driver ? DriverShiftListItemInfo_1.default : ShiftListItemInfo_1.default;
    return ((0, jsx_runtime_1.jsx)(Component, { shift: shift, isAvailable: isAvailable, linkUrl: linkUrl, children: bookedHoursId && ((0, jsx_runtime_1.jsx)("div", { className: "volunteers-shift-checkmark", children: "\u2713 Signed Up" })) }));
};
exports.default = ShiftListItem;
