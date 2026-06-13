import { render, screen } from "@testing-library/react";

import { Root } from "../../../test/setupTests";
import NewMealSurvey from "../old/MealSurveyV2";
import { questions } from "../old/mealSurveyQuestionsV2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

it("fills out the meal survey", async () => {
  render(
    <RouterProvider
      router={createBrowserRouter([
        { index: true, element: <NewMealSurvey /> },
      ])}
    />,
    { wrapper: Root },
  );

  const q1 = screen.getByText(questions[0].English);
  expect(q1).toBeInTheDocument();
});
