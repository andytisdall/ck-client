import _ from "lodash";

import { api } from "../../../api";
import { RecipeState, Recipe, CreateRecipeArgs, EditRecipeArgs } from "./types";

const recipeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipeState, void>({
      query: () => "/home-chef/recipes",
      transformResponse: (response: Recipe[]) => _.mapKeys(response, "id"),
      providesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation<null, string>({
      query: (id) => ({
        url: "/home-chef/recipe/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
    editRecipe: builder.mutation<Recipe, EditRecipeArgs>({
      query: (body) => {
        // turn it into formdata
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("ingredients", body.ingredients);
        formData.append("instructions", body.instructions);
        formData.append("description", body.description);
        formData.append("category", body.category);
        if (body.photo) {
          formData.append("photo", body.photo);
        }
        if (body.author) {
          formData.append("author", body.author);
        }
        return {
          url: "/home-chef/recipe/" + body.id,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
    }),
    createRecipe: builder.mutation<Recipe, CreateRecipeArgs>({
      query: (body) => {
        // turn it into formdata
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("ingredients", body.ingredients);
        formData.append("instructions", body.instructions);
        formData.append("description", body.description);
        formData.append("category", body.category);
        if (body.photo) {
          formData.append("photo", body.photo);
        }
        if (body.author) {
          formData.append("author", body.author);
        }
        return {
          url: "/home-chef/recipe",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useDeleteRecipeMutation,
  useEditRecipeMutation,
  useCreateRecipeMutation,
} = recipeApi;
