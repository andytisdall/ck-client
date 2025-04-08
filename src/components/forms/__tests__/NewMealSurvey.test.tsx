import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Root } from "../../../setupTests";
import NewMealSurvey from "../meal-program/NewMealSurvey";
import { questions } from "../meal-program/mealSurveyQuestions";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

it("fills out the meal survey", async () => {
  render(
    <RouterProvider
      router={createBrowserRouter([
        { index: true, element: <NewMealSurvey /> },
      ])}
    />,
    { wrapper: Root }
  );

  const q1 = screen.getByText(questions[0].English);
});
