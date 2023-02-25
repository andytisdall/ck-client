import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import * as actions from '../../../../actions';
import './CreateRecipe.css';
import Loading from '../../../reusable/Loading';

const CreateRecipe = ({
  createRecipe,
  error,
  recipe,
  editRecipe,
  setError,
}) => {
  const [name, setName] = useState(recipe?.name || '');
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients.join('\n') || ''
  );
  const [instructions, setInstructions] = useState(
    recipe?.instructions.join('\n') || ''
  );
  const [description, setDescription] = useState(recipe?.description || '');
  const [category, setCategory] = useState(recipe?.category || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!category) {
      return setError({ message: 'Please choose a category' });
    }
    if (recipe) {
      editRecipe(recipe.id, e.target);
    } else {
      createRecipe(e.target);
    }
    setName('');
    setIngredients('');
    setInstructions('');
    setDescription('');
    setCategory('');
  };

  const action = recipe ? 'Edit this' : 'Create a ';

  return (
    <div className="admin-item">
      <h2>{action} Recipe</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="ingredients">
          Ingredients (separated by line breaks):
        </label>
        <textarea
          name="ingredients"
          value={ingredients}
          required
          onChange={(e) => setIngredients(e.target.value)}
        />
        <label htmlFor="instructions">
          Instructions (separated by line breaks):
        </label>
        <textarea
          required
          value={instructions}
          name="instructions"
          onChange={(e) => setInstructions(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          required
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Category:</label>
        <div>
          <input
            type="radio"
            name="category"
            id="category-1"
            checked={category === 'mains'}
            onChange={(e) => {
              if (e.target.checked) {
                setCategory('mains');
              }
            }}
          />
          <label htmlFor="category-1">Mains</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            id="category-2"
            checked={category === 'sides'}
            onChange={(e) => {
              if (e.target.checked) {
                setCategory('sides');
              }
            }}
          />
          <label htmlFor="category-2">Sides</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            id="category-3"
            checked={category === 'soups'}
            onChange={(e) => {
              if (e.target.checked) {
                setCategory('soups');
              }
            }}
          />
          <label htmlFor="category-3">Soups</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            id="category-4"
            checked={category === 'veggies'}
            onChange={(e) => {
              if (e.target.checked) {
                setCategory('veggies');
              }
            }}
          />
          <label htmlFor="category-4">Salads & Veggies</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            id="category-5"
            checked={category === 'desserts'}
            onChange={(e) => {
              if (e.target.checked) {
                setCategory('desserts');
              }
            }}
          />
          <label htmlFor="category-5">Desserts</label>
        </div>
        <label htmlFor="image">{'Photo (optional)'}</label>
        <input type="file" name="image" />
        {loading ? <Loading /> : <input type="submit" />}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error.error };
};

export default connect(mapStateToProps, actions)(CreateRecipe);
