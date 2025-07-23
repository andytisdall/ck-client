"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
require("./Status.css");
var Status = function (_a) {
    var tasks = _a.tasks, children = _a.children;
    var renderTask = function (task) {
        return task.completed ? ((0, jsx_runtime_1.jsx)("li", { children: task.text }, task.text)) : ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: task.url, children: (0, jsx_runtime_1.jsx)("li", { children: task.text }) }, task.text));
    };
    var renderIncomplete = function () {
        var incompleteActions = tasks.filter(function (t) { return !t.completed; });
        if (incompleteActions.length) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: children }), (0, jsx_runtime_1.jsx)("ul", { className: "status-incomplete-doc", children: incompleteActions.map(function (action) {
                            return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: action.url, children: (0, jsx_runtime_1.jsx)("li", { children: action.text }) }, action.text));
                        }) })] }));
        }
    };
    var renderComplete = function () {
        var completedActions = tasks.filter(function (t) { return t.completed; });
        if (completedActions.length) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "You have finished the following tasks:" }), (0, jsx_runtime_1.jsx)("ul", { className: "status-completed-doc", children: completedActions.map(renderTask) })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "status-onboarding-checklist", children: [renderIncomplete(), renderComplete()] }));
};
exports.default = Status;
