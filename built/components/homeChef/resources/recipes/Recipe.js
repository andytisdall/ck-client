"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var recipeApi_1 = require("../../../../state/apis/volunteerApi/recipeApi");
var authApi_1 = require("../../../../state/apis/authApi");
var CreateRecipe_1 = __importDefault(require("./CreateRecipe"));
var Loading_1 = __importDefault(require("../../../reusable/loading/Loading"));
var RecipeList_1 = require("./RecipeList");
require("./Recipe.css");
var Recipe = function () {
    var _a;
    var recipeId = (0, react_router_dom_1.useParams)().recipeId;
    var recipes = (0, recipeApi_1.useGetRecipesQuery)().data;
    var recipe = recipes && recipeId ? recipes[recipeId] : undefined;
    var user = (0, authApi_1.useGetUserQuery)().data;
    var _b = __read((0, recipeApi_1.useDeleteRecipeMutation)(), 2), deleteRecipe = _b[0], isLoading = _b[1].isLoading;
    var _c = __read((0, react_1.useState)(false), 2), edit = _c[0], setEdit = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var renderAdmin = function () {
        if ((user === null || user === void 0 ? void 0 : user.admin) && recipeId) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "recipe-admin", children: [(0, jsx_runtime_1.jsx)("div", { className: "recipe-edit", onClick: function () { return setEdit(!edit); }, children: "edit this recipe" }), edit && recipes && recipeId && ((0, jsx_runtime_1.jsx)(CreateRecipe_1.default, { recipe: recipes[recipeId] })), (0, jsx_runtime_1.jsx)("div", { className: "recipe-delete", onClick: function () {
                            deleteRecipe(recipeId);
                            navigate("..");
                        }, children: "delete this recipe" })] }));
        }
    };
    var renderItems = function (name) {
        var listItems = function (_a) {
            var text = _a.text;
            return text
                .filter(function (i) { return i; })
                .map(function (i) {
                return (0, jsx_runtime_1.jsx)("li", { children: i }, i);
            });
        };
        var config = {
            instructions: {
                items: recipe === null || recipe === void 0 ? void 0 : recipe.instructions,
                listFunc: function (item) { return ((0, jsx_runtime_1.jsx)("ol", { className: "recipe-section-items", children: listItems(item) })); },
            },
            ingredients: {
                items: recipe === null || recipe === void 0 ? void 0 : recipe.ingredients,
                listFunc: function (item) { return ((0, jsx_runtime_1.jsx)("ul", { className: "recipe-section-items", children: listItems(item) })); },
            },
        };
        var _a = config[name], items = _a.items, listFunc = _a.listFunc;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "recipe-field", children: [(0, jsx_runtime_1.jsx)("h2", { className: "recipe-field-title", children: name[0].toUpperCase() + name.slice(1) }), items === null || items === void 0 ? void 0 : items.map(function (item, i) {
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "recipe-section", children: [item.header ? (0, jsx_runtime_1.jsx)("h4", { children: item.header }) : null, listFunc(item)] }, name + i));
                })] }));
    };
    var renderImage = function () {
        if (recipe === null || recipe === void 0 ? void 0 : recipe.image) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "recipe-photo", children: (0, jsx_runtime_1.jsx)("img", { src: recipe.image, alt: recipe.name, className: "recipe-img" }) }));
        }
    };
    var renderDescription = function () {
        if (Array.isArray(recipe === null || recipe === void 0 ? void 0 : recipe.description)) {
            return recipe === null || recipe === void 0 ? void 0 : recipe.description.map(function (d) { return (0, jsx_runtime_1.jsx)("p", { children: d }, d); });
        }
        return recipe === null || recipe === void 0 ? void 0 : recipe.description;
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!recipe) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Recipe not found." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "recipe", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "..", children: (0, jsx_runtime_1.jsx)("button", { children: "All Recipes" }) }), (0, jsx_runtime_1.jsx)("h1", { className: "recipe-title", children: recipe.name }), (0, jsx_runtime_1.jsxs)("div", { className: "recipe-body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "recipe-text", children: [(0, jsx_runtime_1.jsxs)("div", { className: "recipe-info", children: [recipe.author ? ((0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("span", { className: "recipe-bold", children: "Author:" }), " ", recipe.author] })) : null, (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("span", { className: "recipe-bold", children: "Category:" }), (_a = RecipeList_1.categories.find(function (cat) { return cat.name === recipe.category; })) === null || _a === void 0 ? void 0 : _a.label] }), (0, jsx_runtime_1.jsx)("div", { className: "recipe-description", children: renderDescription() })] }), renderItems("ingredients"), renderItems("instructions")] }), renderImage()] }), renderAdmin()] }));
};
exports.default = Recipe;
