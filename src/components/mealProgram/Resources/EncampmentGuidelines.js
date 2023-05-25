import DownloadFile from '../../reusable/DownloadFile';

const FILENAME = 'meal-program/CK Encampment Meal Guidelines.pdf';

const EncampmentGuidelines = () => {
  return (
    <div>
      <h1>Community Kitchens Encampment Meal Program Guidelines</h1>
      <DownloadFile filename={FILENAME}>
        Download these guidelines as a PDF
      </DownloadFile>

      <p>
        At Community Kitchens, our encampment meal program provides free hot
        meal distribution to the unhoused throughout Oakland. Many unhoused
        folks don't have access to kitchens, which is why we emphasize serving
        hot meals. CK restaurant meals are used to fill gaps left by other food
        support programs, to promote healthy lifestyles and connection to
        community, and to provide security and dignity for marginalized
        communities. The CK meal program manager will continuously work with our
        community partners to provide you with meal feedback and suggestions.
      </p>
      <h2>Meal Guidelines</h2>
      <ul>
        <li>
          Our primary guideline is that meals prepared should be of equal
          quality to meals sold in your restaurant and are meals that you would
          be proud to serve your own family, friends and customers
        </li>
        <li>Offer wholesome meals that are healthy and nutritious</li>
        <li>Decide 2-4 meals you can rotate</li>
        <li>
          As a general guideline, meals should be 14-16 oz in total weight and
          be broken down into:
          <ul>
            <li>6 oz protein</li>
            <li>4 oz starch or grain</li>
            <li>4 oz vegetables</li>
          </ul>
        </li>
        <li>Individual hot meals</li>
        <li>No liquids</li>
      </ul>
      <h3 className="meal-program-encampment-title">Encampment Meals</h3>
      <p>
        Dental problems are a common health issue among clients, so please take
        that into consideration when menu planning.
      </p>
      <h3 className="meal-program-encampment-title">Hot Meal Suggestions</h3>
      <ul>
        <li>Chicken & veggie curry bowl</li>
        <li>Chicken burrito bowls</li>
        <li>Spaghetti with ground turkey or beef</li>
        <li>Meatloaf with mash potatoes and green beans</li>
        <li>Chicken enchiladas with whole black beans and Mexican rice</li>
        <li>Swedish meatballs with egg noodles and spinach</li>
        <li>Beef & broccoli stir fry with vegetable fried rice</li>
        <li>Fried fish with red beans, rice and greens</li>
        <li>Pot roast with mash potatoes and broccolini</li>
        <li>Pasta primavera with lemon herbed chicken</li>
        <li>Grilled chicken with orzo salad and greens</li>
      </ul>
      <div className="meal-program-encampment-photos">
        <img
          src="/images/meal-program/pasta.jpg"
          alt="ck encampment meals"
          className="meal-program-encampment-photo"
        />
        <img
          src="/images/meal-program/beans-rice.png"
          alt="ck encampment meals"
          className="meal-program-encampment-photo"
        />
        <img
          src="/images/meal-program/rice-bowl.png"
          alt="ck encampment meals"
          className="meal-program-encampment-photo"
        />
      </div>
    </div>
  );
};

export default EncampmentGuidelines;
