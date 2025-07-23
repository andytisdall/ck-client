"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emailIsValid = function (input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(validRegex);
};
exports.default = emailIsValid;
