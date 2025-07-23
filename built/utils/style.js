"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navLink = void 0;
var navLink = function (_a) {
    var isActive = _a.isActive, isPending = _a.isPending;
    var status = isPending
        ? 'nav-link-pending'
        : isActive
            ? 'nav-link-active'
            : '';
    return "button ".concat(status);
};
exports.navLink = navLink;
