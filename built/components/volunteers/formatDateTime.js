"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCarBigEnough = exports.formatTime = exports.formatDate = void 0;
var date_fns_tz_1 = require("date-fns-tz");
var formatDate = function (date) {
    return (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(date, "America/Los_Angeles"), "eee, M/d/yy");
};
exports.formatDate = formatDate;
var formatTime = function (date) {
    return (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(date, "America/Los_Angeles"), "h:mm aaa");
};
exports.formatTime = formatTime;
var carSizes = ["Bike", "Small", "Medium", "Large"];
var isCarBigEnough = function (_a) {
    var requirement = _a.requirement, userCar = _a.userCar;
    if (!requirement || !userCar) {
        return false;
    }
    var shiftSize = carSizes.findIndex(function (size) { return size === requirement; });
    var userCarSize = carSizes.findIndex(function (size) { return size === userCar; });
    return userCarSize >= shiftSize;
};
exports.isCarBigEnough = isCarBigEnough;
