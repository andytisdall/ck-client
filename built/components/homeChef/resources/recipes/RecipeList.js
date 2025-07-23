"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var recipeApi_1 = require("../../../../state/apis/volunteerApi/recipeApi");
var Loading_1 = __importDefault(require("../../../reusable/loading/Loading"));
require("./RecipeList.css");
exports.categories = [
    { label: "Mains", name: "mains" },
    { label: "Sides", name: "sides" },
    { label: "Salads & Veggies", name: "veggies" },
    { label: "Soups", name: "soups" },
    { label: "Desserts", name: "desserts" },
];
var RecipeList = function () {
    var _a = (0, recipeApi_1.useGetRecipesQuery)(), data = _a.data, isLoading = _a.isLoading;
    var recipes = data;
    var orderedRecipes = (0, react_1.useMemo)(function () {
        if (recipes) {
            var ordered_1 = {};
            Object.values(recipes)
                .sort(function (a, b) { return (a.name > b.name ? 1 : -1); })
                .forEach(function (rec) {
                var catList = ordered_1[rec.category];
                if (catList) {
                    catList.push(rec);
                }
                else {
                    ordered_1[rec.category] = [rec];
                }
            });
            return ordered_1;
        }
    }, [recipes]);
    var renderRecipes = (0, react_1.useCallback)(function () {
        if (isLoading || !orderedRecipes) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        return exports.categories
            .filter(function (_a) {
            var name = _a.name;
            return orderedRecipes[name];
        })
            .map(function (cat) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: cat.label }), orderedRecipes[cat.name].map(function (r) {
                        return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: r.id, className: "recipe-list-item", children: r.name }) }, r.id));
                    })] }, cat.name));
        });
    }, [orderedRecipes, isLoading]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "recipe-list-container", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Recipes" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "add-recipe", children: (0, jsx_runtime_1.jsx)("button", { className: "recipe-add-button", children: "Add a Recipe" }) }), (0, jsx_runtime_1.jsx)("ul", { children: renderRecipes() })] }), (0, jsx_runtime_1.jsxs)("div", { className: "recipe-list-images", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/recipe-list-1.jpg", alt: "food" }), (0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/recipe-list-2.png", alt: "food" }), (0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/recipe-list-3.png", alt: "food" }), (0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/recipe-list-4.jpeg", alt: "food" }), (0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/recipe-list-5.png", alt: "food" })] })] }));
};
exports.default = RecipeList;
