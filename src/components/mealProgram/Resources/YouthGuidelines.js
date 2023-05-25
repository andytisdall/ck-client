import DownloadFile from '../../reusable/DownloadFile';

const FILENAME = 'meal-program/CK Youth Meal Guidelines.pdf';

const YouthGuidelines = () => {
  return (
    <div>
      <h1>Community Kitchens Youth Meal Program Guidelines</h1>
      <DownloadFile filename={FILENAME}>
        Download these guidelines as a PDF
      </DownloadFile>
      <p>
        At Community Kitchens, our youth program is guided by the same
        principles that shape our other meal programs. Our meals are used to
        fill gaps left by other food support programs, to promote healthy
        lifestyles and connection to community, and to provide security and
        dignity for marginalized communities. We want to give our kids a healthy
        meal to help them to focus on learning and playing while they grow.
      </p>
      <h2>Overview</h2>
      <p>
        CK youth meal programs serve "Lunch Box Style" meals to children in
        sports camps, after school programs, elementary and middle schools and
        are intended to be eaten on site. Other youth meal programs provide
        cold, "Take Away" meals to be reheated. Please confirm with the CK Meal
        Program Manager what type of meals you are providing.
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
        <li>No use of tree nuts, peanuts, and shellfish</li>
      </ul>
      <section className="meal-program-info-box">
        <div className="meal-program-info-box-header">
          <h3>Lunch Box Style Meals</h3>
          <img
            src="/images/meal-program/sandwiches.jpg"
            alt="lunch box meals"
            className="meal-program-info-box-photo"
          />
        </div>
        <div className="meal-program-info-box-text">
          <p className="meal-program-info-box-text-large">
            "Lunch Box Style" meals, will be consumed on site and should be cold
            and ready to eat such as a wrap with a side of fruit, or veggies.
            Wraps can be very versatile and hold up well.
          </p>
          <ul className="meal-program-info-box-text-small">
            <li>
              <b>Suggested meals:</b> deli sandwich, wrap, naan or pita pocket
              with sliced meat and cheese.
            </li>
            <li>
              <b>Fresh sides:</b> fruit cup, pasta salad, veggie crudité &
              hummus, potato salad
            </li>
            <li>
              <b>Healthy suggestions:</b> use whole grain bread, lots of fruit
              and veggies
            </li>
            <li>
              <b>Packaging:</b> condiments on the side, please put side salads
              in cups
            </li>
          </ul>
        </div>
      </section>

      <section className="meal-program-info-box">
        <div className="meal-program-info-box-header">
          <h3>Take Away Meals</h3>
          <img
            src="/images/meal-program/chicken.jpg"
            alt="lunch box meals"
            className="meal-program-info-box-photo"
          />
        </div>
        <div className="meal-program-info-box-text">
          <p className="meal-program-info-box-text-large">
            "Take Away" meals are cold and designed to take home and reheat.
          </p>
          <ul className="meal-program-info-box-text-small">
            <li>
              <b>Suggested meals:</b> Pasta primavera with grilled chicken,
              meatloaf with mash potatoes and green beans, chicken enchiladas
              with whole black beans and Mexican rice, Swedish meatballs with
              egg noodles and spinach, beef & broccoli stir fry with herbed rice
            </li>
            <li>
              <b>Healthy suggestions:</b> whole beans instead of refried, stay
              away from fried foods, use less saturated fat (olive oil instead
              of butter)
            </li>
            <li>
              <b>Avoid just white rice:</b> Add some goodies like coconut rice
              or cilantro rice with stews, Mexican rice with tomato and carrots
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default YouthGuidelines;
