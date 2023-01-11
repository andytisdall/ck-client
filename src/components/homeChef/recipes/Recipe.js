import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import { getRecipe } from '../../../actions';
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
    return <Spinner size={20} color="black" />;
  }

  return (
    <div>
      <img
        src={recipe.image}
        alt={recipe.name + ' photo'}
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
