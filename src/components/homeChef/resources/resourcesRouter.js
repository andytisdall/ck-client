import { lazy } from 'react';

import renderWithFallback from '../../reusable/renderWithFallback';

const Resources = lazy(() => import('./Resources'));
const ResourcesList = lazy(() => import('./ResourcesList'));
const RecipeList = lazy(() => import('./recipes/RecipeList'));
const Recipe = lazy(() => import('./recipes/Recipe'));
const CreateRecipe = lazy(() => import('./recipes/CreateRecipe'));
const Labels = lazy(() => import('./Labels'));

const resourcesRouter = {
  path: 'resources',
  element: renderWithFallback(<Resources />),
  children: [
    { index: true, element: renderWithFallback(<ResourcesList />) },

    {
      path: 'recipes',
      children: [
        { index: true, element: renderWithFallback(<RecipeList />) },
        { path: ':recipeId', element: renderWithFallback(<Recipe />) },
        {
          path: 'add-recipe',
          element: renderWithFallback(<CreateRecipe />),
        },
      ],
    },
    {
      path: 'labels',
      element: renderWithFallback(<Labels />),
    },
  ],
};

export default resourcesRouter;
