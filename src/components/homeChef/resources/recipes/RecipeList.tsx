import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetRecipesQuery,
  Recipe,
} from '../../../../state/apis/volunteerApi';

import Loading from '../../../reusable/loading/Loading';
import './RecipeList.css';

export const categories = [
  { label: 'Mains', name: 'mains' },
  { label: 'Sides', name: 'sides' },
  { label: 'Salads & Veggies', name: 'veggies' },
  { label: 'Soups', name: 'soups' },
  { label: 'Desserts', name: 'desserts' },
];

const RecipeList = () => {
  const { data, isLoading } = useGetRecipesQuery();
  const recipes = data;

  const orderedRecipes = useMemo(() => {
    if (recipes) {
      const ordered: Record<string, Recipe[]> = {};
      Object.values(recipes)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .forEach((rec) => {
          const catList = ordered[rec.category];
          if (catList) {
            catList.push(rec);
          } else {
            ordered[rec.category] = [rec];
          }
        });
      return ordered;
    }
  }, [recipes]);

  const renderRecipes = useCallback(() => {
    if (isLoading || !orderedRecipes) {
      return <Loading />;
    }

    return categories
      .filter(({ name }) => orderedRecipes[name])
      .map((cat) => {
        return (
          <div key={cat.name}>
            <h3>{cat.label}</h3>
            {orderedRecipes[cat.name].map((r) => {
              return (
                <li key={r.id}>
                  <Link to={r.id} className="recipe-list-item">
                    {r.name}
                  </Link>
                </li>
              );
            })}
          </div>
        );
      });
  }, [orderedRecipes, isLoading]);

  return (
    <div className="recipe-list-container">
      <div>
        <h1>Recipes</h1>
        <Link to="add-recipe">
          <button className="recipe-add-button">Add a Recipe</button>
        </Link>
        <ul>{renderRecipes()}</ul>
      </div>
      <div className="recipe-list-images">
        <img src="/images/home-chef/recipe-list-1.jpg" alt="food" />
        <img src="/images/home-chef/recipe-list-2.png" alt="food" />
        <img src="/images/home-chef/recipe-list-3.png" alt="food" />
        <img src="/images/home-chef/recipe-list-4.jpeg" alt="food" />
        <img src="/images/home-chef/recipe-list-5.png" alt="food" />
      </div>
    </div>
  );
};

export default RecipeList;
