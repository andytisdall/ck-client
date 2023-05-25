import DownloadFile from '../../reusable/DownloadFile';
import './Packaging.css';

const LABEL_FILE = 'meal-program/meal-label-template.docx';

const Packaging = () => {
  return (
    <div>
      <h1>Meal Packaging & Labels</h1>
      <h3 className="meal-program-packaging-title">Packaging</h3>
      <p>
        We recommend this 24 oz container available from Webstaurantstore.com.
        It is recyclable, microwave safe, dishwasher safe, freezer safe and BPA
        free.
      </p>
      <a
        target="blank"
        className="meal-program-packaging-link"
        href="https://www.webstaurantstore.com/choice-24-oz-black-8-x-5-1-4-x-1-1-2-rectangular-microwavable-heavyweight-container-
with-lid-case/129MCS24B.html?utm_source=webstaurant&utm_medium=email&utm_campaign=auto-order-confirmation"
      >
        <div>
          <b>
            Choice 24 oz. Black Rectangular Microwavable Heavy Weight Container
            with Lid
          </b>
          <p> 8" x 5 1/4" x 2"</p>
          <p>150 Count ($28-$30 per case)</p>
        </div>
        <img src="/images/meal-program/packaging.jpg" alt="to-go containers" />
      </a>
      <h3 className="meal-program-packaging-title">Ingredient Labels</h3>
      <p>
        Every meal must have an ingredient label. You are welcome to use the
        included template for Avery 8162 Easy Peel Address Labels, or your own
        system.
      </p>
      <DownloadFile filename={LABEL_FILE}>
        Download the Label Template
      </DownloadFile>
      <p>Please include the following information on your labels:</p>
      <ul>
        <li>Restaurant Name</li>
        <li>Meal Name</li>
        <li>Ingredients</li>
        <li>Allergens</li>
        <li>Reheat instructions</li>
        <li>Prepared on Date</li>
      </ul>
      <p>Example:</p>
      <img src="/images/food-label.png" alt="example food label" />
    </div>
  );
};

export default Packaging;
