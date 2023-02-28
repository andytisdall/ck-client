import { connect } from 'react-redux';
import { useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../../../reusable/Loading';
import * as actions from '../../../../actions';
import './RecipeList.css';

export const categories = [
  { label: 'Mains', name: 'mains' },
  { label: 'Sides', name: 'sides' },
  { label: 'Salads & Veggies', name: 'veggies' },
  { label: 'Soups', name: 'soups' },
  { label: 'Desserts', name: 'desserts' },
];

const RecipeList = ({ recipes, getRecipes }) => {
  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const orderedRecipes = useMemo(() => {
    if (recipes) {
      const ordered = {};
      Object.values(recipes)
        .sort((a, b) => (a.name > b.name ? -1 : 1))
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
    if (!Object.values(orderedRecipes).length) {
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
  }, [orderedRecipes]);

  return (
    <div>
      <h1>Recipes</h1>
      <Link to="add-recipe">
        <button>Add a Recipe</button>
      </Link>
      <ul>{renderRecipes()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { recipes: state.recipes };
};

export default connect(mapStateToProps, actions)(RecipeList);
