"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateRecipeMutation = exports.useEditRecipeMutation = exports.useDeleteRecipeMutation = exports.useGetRecipesQuery = void 0;
var lodash_1 = __importDefault(require("lodash"));
var api_1 = require("../../api");
var recipeApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getRecipes: builder.query({
            query: function () { return '/home-chef/recipes'; },
            transformResponse: function (response) { return lodash_1.default.mapKeys(response, 'id'); },
            providesTags: ['Recipe'],
        }),
        deleteRecipe: builder.mutation({
            query: function (id) { return ({
                url: '/home-chef/recipe/' + id,
                method: 'DELETE',
            }); },
            invalidatesTags: ['Recipe'],
        }),
        editRecipe: builder.mutation({
            query: function (body) {
                // turn it into formdata
                var formData = new FormData();
                formData.append('name', body.name);
                formData.append('ingredients', body.ingredients);
                formData.append('instructions', body.instructions);
                formData.append('description', body.description);
                formData.append('category', body.category);
                if (body.photo) {
                    formData.append('photo', body.photo);
                }
                if (body.author) {
                    formData.append('author', body.author);
                }
                return {
                    url: '/home-chef/recipe/' + body.id,
                    method: 'PATCH',
                    body: formData,
                    formData: true,
                };
            },
        }),
        createRecipe: builder.mutation({
            query: function (body) {
                // turn it into formdata
                var formData = new FormData();
                formData.append('name', body.name);
                formData.append('ingredients', body.ingredients);
                formData.append('instructions', body.instructions);
                formData.append('description', body.description);
                formData.append('category', body.category);
                if (body.photo) {
                    formData.append('photo', body.photo);
                }
                if (body.author) {
                    formData.append('author', body.author);
                }
                return {
                    url: '/home-chef/recipe',
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
        }),
    }); },
});
exports.useGetRecipesQuery = recipeApi.useGetRecipesQuery, exports.useDeleteRecipeMutation = recipeApi.useDeleteRecipeMutation, exports.useEditRecipeMutation = recipeApi.useEditRecipeMutation, exports.useCreateRecipeMutation = recipeApi.useCreateRecipeMutation;
