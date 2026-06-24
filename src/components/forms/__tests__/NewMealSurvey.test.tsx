import { render, screen, within } from "@testing-library/react";

import { Root } from "../../../test/setupTests";
import NewMealSurvey from "../meal-program/MealSurveyV3";
import { questionsByLanguage } from "../meal-program/mealSurveyQuestions/mealSurveyQuestionsV3";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createServer } from "../../../test/createServer";
import FormSent from "../FormSent";

const { English } = questionsByLanguage;

describe("meal survey form", () => {
  createServer([
    { path: "/meal-program/survey3", res: async () => null, method: "post" },
  ]);

  it("fills out the meal survey", async () => {
    render(
      <RouterProvider
        router={createBrowserRouter([
          { index: true, element: <NewMealSurvey /> },
          { path: "/forms/form-sent", element: <FormSent /> },
        ])}
      />,
      { wrapper: Root },
    );

    const { questions } = English;

    // zip code text input

    const zipInput = screen.getByTestId("zip");
    await userEvent.type(zipInput, "94112");

    // food favorites matrix

    questions[11].options.forEach(async (food, i) => {
      const btn = screen.getByTestId(
        `${food.replace(/ /g, "").replace("/", "")}-${i + 1}`,
      );
      await userEvent.click(btn);
    });

    // randomly choose an option and select it for the rest of the questions

    questions.forEach(async (question) => {
      const q = screen.getByText(question.question);
      expect(q).toBeInTheDocument();

      if (question.options.length) {
        const optIndex = Math.round(
          Math.random() * (question.options.length - 1),
        );

        // eslint-disable-next-line testing-library/no-node-access
        const qParent = q.parentElement;
        if (qParent) {
          // eslint-disable-next-line testing-library/no-node-access
          const opt = within(qParent).getByText(question.options[optIndex]);
          await userEvent.click(opt);
        }
      }
    });

    const submitBtn = screen.getByText("Submit");
    await userEvent.click(submitBtn);

    const successText = await screen.findByText(
      English.displayText.successText,
    );
    expect(successText).toBeInTheDocument();
  });
});
