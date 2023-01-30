import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import Loading from '../../../reusable/Loading';
import { getRecipe } from '../../../../actions';
import './Recipe.css';

const Recipe = ({ recipes, getRecipe }) => {
  const { recipeId } = useParams();

  useEffect(() => {
    if (!recipes[recipeId]) {
      getRecipe(recipeId);
    }
  }, [recipes, recipeId, getRecipe]);

  const renderList = (list) => {
    return list.map((i) => {
      return <li key={i}>{i}</li>;
    });
  };

  const recipe = recipes[recipeId];

  if (!recipe) {
    return <Loading />;
  }

  return (
    <div>
      <img
        src={`/api/db/images/${recipe.image}`}
        alt={recipe.name}
        className="recipe-photo"
      />
      <h1>{recipe.name}</h1>
      <h3>{recipe.description}</h3>
      <h2>Ingredients:</h2>
      <ul>{renderList(recipe.ingredients)}</ul>
      <h2>Instructions:</h2>
      <ol>{renderList(recipe.instructions)}</ol>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { recipes: state.recipes };
};

export default connect(mapStateToProps, { getRecipe })(Recipe);
