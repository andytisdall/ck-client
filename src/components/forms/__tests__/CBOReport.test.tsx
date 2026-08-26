import { render, screen } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "../../../test/setupTests";
import CBOReport from "../meal-program/CBOReport";
import userEvent from "@testing-library/user-event";
import { createServer } from "../../../test/createServer";
import FormSent from "../FormSent";
import { CBOReport as CBOReportType } from "@community-kitchens/apiinterfaces";

const CBOReportAnswers: CBOReportType = {
  month: "1",
  name: "d",
  cboName: "ed",
  performanceMeasures: {
    withoutAccess: 1,
    lowIncome: 2,
    mealsProvided: 3,
    unusable: 4,
    postcards: 5,
    calfreshApps: 6,
    SSA: 7,
  },
  age: {
    age17: 1,
    age26: 2,
    age49: 3,
    age60: 4,
    ageOver60: 5,
    ageUnknown: 6,
  },
  race: {
    raceAfrican: 11,
    raceLatin: 12,
    raceAsian: 14,
    raceNativeAmerican: 15,
    raceWhite: 65,
    raceDecline: 54,
    raceUnknown: 100,
    raceOther: 0,
    raceOtherText: "Something",
    raceMixed: 4,
    raceMixedText: "Something Else",
  },
  individuals: 501,
  households: 333,
  zips: { 94618: 5, 94619: 10, 94610: 125 },
  feedback: "We love the meals",
  phone: "415-819-0251",
  email: "andy@ckoakland.org",
  year: "2026",
  waters: "",
  juices: "",
  socks: "",
  granolaBars: "",
  tortillaChips: "",
  extraItem: "",
  extraItemAmount: "",
};

const objectsMatch = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
): boolean => {
  const obj1Keys = Object.keys(obj1);
  return obj1Keys.every((key) => {
    if (typeof obj1[key] === "object") {
      return objectsMatch(obj1[key], obj2[key]);
    }
    return obj1[key] === obj2[key];
  });
};

describe("CBO report", () => {
  createServer([
    {
      path: "/meal-program/cbo",
      res: async (req) => {
        const answers = req.body;
        const formattedAnswers = { ...answers };
        for (let pm of Object.keys(formattedAnswers.performanceMeasures)) {
          formattedAnswers.performanceMeasures[pm] = parseInt(
            formattedAnswers.performanceMeasures[pm],
          );
        }
        for (let race of Object.keys(formattedAnswers.race)) {
          if (!["raceMixedText", "raceOtherText"].includes(race))
            formattedAnswers.race[race] = parseInt(formattedAnswers.race[race]);
        }
        for (let age of Object.keys(formattedAnswers.age)) {
          formattedAnswers.age[age] = parseInt(formattedAnswers.age[age]);
        }
        for (let zip of Object.keys(formattedAnswers.zips)) {
          formattedAnswers.zips[zip] = parseInt(formattedAnswers.zips[zip]);
        }
        formattedAnswers.individuals = parseInt(formattedAnswers.individuals);
        formattedAnswers.households = parseInt(formattedAnswers.households);

        if (
          !objectsMatch(formattedAnswers, CBOReportAnswers) ||
          !objectsMatch(CBOReportAnswers, formattedAnswers)
        ) {
          throw Error();
        }
        return null;
      },
      method: "post",
    },
  ]);

  it("fills out the CBO report", async () => {
    render(
      <RouterProvider
        router={createBrowserRouter([
          { index: true, element: <CBOReport /> },
          { path: "/forms/form-sent", element: <FormSent /> },
        ])}
      />,
      { wrapper: Root },
    );

    const header = await screen.findByText(/cbo monthly report/i);
    expect(header).toBeInTheDocument();

    const cboName = screen.getByLabelText(/cbo name/i);
    await userEvent.type(cboName, CBOReportAnswers.cboName);

    const month = screen.getByTestId(/monthselect/i);
    await userEvent.selectOptions(month, "February");

    const reportCompletedBy = screen.getByLabelText(/report Completed By/i);
    await userEvent.type(reportCompletedBy, CBOReportAnswers.name);

    const phone = screen.getByLabelText(/phone number/i);
    await userEvent.type(phone, CBOReportAnswers.phone!);

    const email = screen.getByLabelText(/email/i);
    await userEvent.type(email, CBOReportAnswers.email);

    const mealsProvided = screen.getByLabelText(/# of meals ck provided/i);
    await userEvent.type(
      mealsProvided,
      CBOReportAnswers.performanceMeasures.mealsProvided.toString(),
    );

    const unusable = screen.getByLabelText(
      /# of meals procured that were wasted or undelivered due to spoilage/i,
    );
    await userEvent.type(
      unusable,
      CBOReportAnswers.performanceMeasures.unusable.toString(),
    );

    const individuals = screen.getByLabelText(
      /# of unduplicated individuals provided food in the month/i,
    );
    await userEvent.type(individuals, CBOReportAnswers.individuals.toString());

    const households = screen.getByLabelText(
      /# of unduplicated households provided food in the month/i,
    );
    await userEvent.type(households, CBOReportAnswers.households.toString());

    const individualsWithoutAccess = screen.getByLabelText(
      /# unduplicated individuals served without access to a kitchen to prepare meals/i,
    );
    await userEvent.type(
      individualsWithoutAccess,
      CBOReportAnswers.performanceMeasures.withoutAccess.toString(),
    );

    const houseHoldsWithoutAccess = screen.getByLabelText(
      /# of unduplicated households served without access to a kitchen to prepare meals/i,
    );
    await userEvent.type(
      houseHoldsWithoutAccess,
      CBOReportAnswers.performanceMeasures.lowIncome.toString(),
    );

    const postcards = screen.getByLabelText(
      /# Cal Fresh postcards distributed with meals/i,
    );
    await userEvent.type(
      postcards,
      CBOReportAnswers.performanceMeasures.postcards.toString(),
    );

    const assisted = screen.getByLabelText(
      /# unduplicated individuals assisted with CalFresh applications/i,
    );
    await userEvent.type(
      assisted,
      CBOReportAnswers.performanceMeasures.calfreshApps.toString(),
    );

    const ssa = screen.getByLabelText(
      /# prescreened CalFresh applications sent to SSA each month/i,
    );
    await userEvent.type(
      ssa,
      CBOReportAnswers.performanceMeasures.SSA.toString(),
    );

    const age1 = screen.getByLabelText(/0-17/);
    await userEvent.type(age1, CBOReportAnswers.age.age17.toString());
    const age2 = screen.getByLabelText(/18-26/);
    await userEvent.type(age2, CBOReportAnswers.age.age26.toString());
    const age3 = screen.getByLabelText(/27-49/);
    await userEvent.type(age3, CBOReportAnswers.age.age49.toString());
    const age4 = screen.getByLabelText(/50-60/);
    await userEvent.type(age4, CBOReportAnswers.age.age60.toString());
    const age5 = screen.getByLabelText(/Over 60/);
    await userEvent.type(age5, CBOReportAnswers.age.ageOver60.toString());
    const age6 = screen.getAllByLabelText(/Unknown/);
    await userEvent.type(age6[0], CBOReportAnswers.age.ageUnknown.toString());

    const race1 = screen.getByLabelText(/African-American \/ Black/);
    await userEvent.type(race1, CBOReportAnswers.race.raceAfrican.toString());
    const race2 = screen.getByLabelText(/Latina \/ Latino/);
    await userEvent.type(race2, CBOReportAnswers.race.raceLatin.toString());
    const race3 = screen.getByLabelText(/Asian \/ Pacific Islander/);
    await userEvent.type(race3, CBOReportAnswers.race.raceAsian.toString());
    const race4 = screen.getByLabelText(/Native American \/ American Indian/);
    await userEvent.type(
      race4,
      CBOReportAnswers.race.raceNativeAmerican.toString(),
    );
    const race5 = screen.getByLabelText(/White \/ Caucasian/);
    await userEvent.type(race5, CBOReportAnswers.race.raceWhite.toString());
    const race6 = screen.getAllByLabelText(/Mixed Race/);
    await userEvent.type(race6[0], CBOReportAnswers.race.raceMixed.toString());
    const race7 = screen.getAllByLabelText(/Other/);
    await userEvent.type(race7[0], CBOReportAnswers.race.raceOther.toString());

    const specifyMixed = screen.getByLabelText(/Specify Mixed Race/);
    await userEvent.type(specifyMixed, CBOReportAnswers.race.raceMixedText);

    const specifyOther = screen.getByLabelText(/Specify Other Race/);
    await userEvent.type(specifyOther, CBOReportAnswers.race.raceOtherText);

    const decline = screen.getByLabelText(/Decline to State/);
    await userEvent.type(decline, CBOReportAnswers.race.raceDecline.toString());

    const unknown = screen.getAllByLabelText(/Unknown/);
    await userEvent.type(
      unknown[1],
      CBOReportAnswers.race.raceUnknown.toString(),
    );

    const addZipBtn = screen.getByText(/add a zip code/i);
    await userEvent.click(addZipBtn);

    const zipSelector1 = await screen.findByTestId("ziplist-0");
    await userEvent.selectOptions(zipSelector1, "94618");
    const zip1Input = screen.getByTestId("ziplist-0-input");
    await userEvent.type(zip1Input, CBOReportAnswers.zips["94618"]!.toString());

    await userEvent.click(addZipBtn);

    const zipSelector2 = await screen.findByTestId("ziplist-1");
    await userEvent.selectOptions(zipSelector2, "94610");
    const zip2Input = screen.getByTestId("ziplist-1-input");
    await userEvent.type(zip2Input, CBOReportAnswers.zips["94610"]!.toString());

    await userEvent.click(addZipBtn);

    const zipSelector3 = await screen.findByTestId("ziplist-2");
    await userEvent.selectOptions(zipSelector3, "94619");
    const zip3Input = screen.getByTestId("ziplist-2-input");
    await userEvent.type(zip3Input, CBOReportAnswers.zips["94619"]!.toString());

    const feedback = screen.getByLabelText(
      "Do you have any feedback about the meals you've been receiving?",
    );
    await userEvent.type(feedback, CBOReportAnswers.feedback!);

    const submitBtn = screen.getAllByText(/submit/i);
    await userEvent.click(submitBtn[1]);

    const formSentText = await screen.findByText(
      /your submission was successful/i,
    );
    expect(formSentText).toBeInTheDocument();
  });
});
