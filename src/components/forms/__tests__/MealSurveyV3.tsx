import { render, screen, within } from "@testing-library/react";

import { Root } from "../../../test/setupTests";
import NewMealSurvey from "../meal-program/MealSurveyV3";
import { questionsByLanguage } from "../meal-program/mealSurveyQuestions/mealSurveyQuestionsV3";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createServer } from "../../../test/createServer";
import FormSent from "../FormSent";

const { English, Chinese, Spanish } = questionsByLanguage;

describe("meal survey form", () => {
  createServer([
    {
      path: "/meal-program/survey",
      res: async (req) => {
        const values = Object.values(req.body);
        let index = -1;
        const validValues = values.map((value) => {
          if ([-1, 3].includes(index)) {
            index++;
            return true;
          }
          if ([4, 9, 11, 14, 19, 23].includes(index)) {
            return true;
          }
          if (typeof value === "string") {
            const result = English.questions[index].options.includes(value);
            index++;
            return result;
          }
          if (Array.isArray(value)) {
            return value.every((v) =>
              English.questions[index].options.includes(v),
            );
          }
          index++;
          return true;
        });
        if (!validValues.every((v) => v)) {
          throw Error("Values are not valid");
        }
        // console.log(req.body);
        return null;
      },
      method: "post",
    },
  ]);

  it("fills out the meal survey in english", async () => {
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

  it("fills out the meal survey in chinese", async () => {
    render(
      <RouterProvider
        router={createBrowserRouter([
          { index: true, element: <NewMealSurvey /> },
          { path: "/forms/form-sent", element: <FormSent /> },
        ])}
      />,
      { wrapper: Root },
    );

    const { questions } = Chinese;

    const changeLanguageBtn = await screen.findByTestId("language-btn-chinese");
    await userEvent.click(changeLanguageBtn);

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

    const submitBtn = screen.getByText(Chinese.displayText.submitText);
    await userEvent.click(submitBtn);

    const successText = await screen.findByText(
      Chinese.displayText.successText,
    );
    expect(successText).toBeInTheDocument();
  });

  it("fills out the meal survey in spanish", async () => {
    render(
      <RouterProvider
        router={createBrowserRouter([
          { index: true, element: <NewMealSurvey /> },
          { path: "/forms/form-sent", element: <FormSent /> },
        ])}
      />,
      { wrapper: Root },
    );

    const { questions } = Spanish;

    const changeLanguageBtn = await screen.findByTestId("language-btn-spanish");
    await userEvent.click(changeLanguageBtn);

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

    const submitBtn = screen.getByText(Spanish.displayText.submitText);
    await userEvent.click(submitBtn);

    const successText = await screen.findByText(
      Spanish.displayText.successText,
    );
    expect(successText).toBeInTheDocument();
  });
});
