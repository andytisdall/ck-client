import CreateUser from './CreateUser';
import CreateRestaurant from './CreateRestaurant';
import CreateRecipe from './CreateRecipe';

const Create = () => {
  return (
    <div className="create-main">
      <CreateUser />
      <CreateRestaurant />
      <CreateRecipe />
    </div>
  );
};

export default Create;
