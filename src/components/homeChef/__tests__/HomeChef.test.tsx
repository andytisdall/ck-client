import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format, utcToZonedTime } from "date-fns-tz";
import { formatISO, addDays, addHours } from "date-fns";

import { createServer } from "../../../test/createServer";
import { User, ContactInfo } from "../../../state/apis/authApi";
import {
  Shift,
  VolunteerHours,
  Campaign,
} from "../../../state/apis/volunteerApi/types";
import { HomeChefJob } from "../../../state/apis/volunteerApi/homeChefApi/types";
import App from "../../../App";
import { Root } from "../../../setupTests";

export const campaign: Campaign = {
  mealsDonated: 100,
};

const user: User = {
  username: "chompy",
  id: "48yrf848fy48",
  admin: false,
  salesforceId: "d093900",
  active: true,
};

export const userInfo1: ContactInfo = {
  firstName: "Testy",
  lastName: "Testorici",
  homeChefAgreement: true,
  volunteerAgreement: true,
  foodHandler: true,
  homeChefStatus: "Active",
  homeChefQuizPassed: true,
};

export const job1: HomeChefJob = {
  id: "7777",
  name: "Homies",
  shifts: ["1111", "2222"],
  active: true,
  location: "Location",
  ongoing: true,
  description: "kh",
  campaign: "wslejfn",
  region: "East Oakland",
};

export const shift1: Shift = {
  id: job1.shifts[0],
  startTime: formatISO(addDays(new Date(), 1)),
  endTime: formatISO(addHours(addDays(new Date(), 1), 2)),

  open: true,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 3,
};

export const shift2: Shift = {
  id: job1.shifts[1],
  startTime: formatISO(addDays(new Date(), 2)),
  endTime: formatISO(addHours(addDays(new Date(), 2), 2)),
  open: true,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 3,
};

export const hours1: VolunteerHours = {
  id: "d38ih3d",
  mealCount: "25",
  time: shift1.startTime,
  job: job1.id,
  status: "Confirmed",
  shift: shift1.id,
  mealType: "Soup",
};

export const hours2: VolunteerHours = {
  id: "7tt7999",
  mealCount: "30",
  time: shift2.startTime,
  job: job1.id,
  status: "Confirmed",
  shift: shift2.id,
  mealType: "Entree",
};

describe("not signed in", () => {
  createServer([
    { path: "/user", res: async () => null },
    { path: "/user/userInfo", res: async () => null },
    { path: "/volunteers/campaigns", res: async () => [] },
  ]);

  test("navigate to home chef page", async () => {
    render(<App />, { wrapper: Root });

    const volunteersLink = await screen.findAllByText("CK Volunteers");
    await userEvent.click(volunteersLink[1]);
    // volunteers home
    const homeChefLink = await screen.findByText("Home Chef Volunteers");
    await userEvent.click(homeChefLink);

    // home chef home
    const statusText = await screen.findByText(/you must be signed in/i);
    expect(statusText).toBeDefined();
  });
});

describe("signed in", () => {
  createServer([
    { path: "/user", res: async () => user },
    { path: "/user/userInfo", res: async () => userInfo1 },
    { path: "/home-chef/campaign", res: async () => campaign },
    {
      path: "/home-chef/job-listing",
      res: async () => ({ jobs: [job1], shifts: [shift1, shift2] }),
    },
    { path: "/home-chef/hours", res: async () => [hours1, hours2] },
    { path: "/home-chef/hours", method: "post", res: async () => hours2 },
    { path: "/home-chef/ordering", method: "post", res: async () => null },
  ]);

  test("see chef shifts", async () => {
    render(<App />, { wrapper: Root });

    const chefLink = await screen.findByText(
      "See upcoming deliveries you've signed up for, and past deliveries you've made",
    );
    await userEvent.click(chefLink);

    // chef page
    const upcomingShifts = await screen.findByRole("heading", {
      name: "Upcoming Deliveries",
    });
    expect(upcomingShifts).toBeDefined();

    const hours = screen.getByText(
      format(utcToZonedTime(hours1.time, "America/Los_Angeles"), "eee, M/d/yy"),
    );
    expect(hours).toBeDefined();
  });

  test("sign up with list view", async () => {
    render(<App />, { wrapper: Root });

    const homeChefHome = await screen.findByAltText("home chef header");
    await userEvent.click(homeChefHome);
    const signupLink = await screen.findByText(
      "Sign Up to Stock a Town Fridge",
    );
    await userEvent.click(signupLink);

    // list view

    const jobTitle = await screen.findByText(job1.name);
    await userEvent.click(jobTitle);
    const shiftDate = await screen.findByText(
      format(utcToZonedTime(shift1.startTime, "America/Los_Angeles"), "M/d/yy"),
    );
    expect(shiftDate).toBeDefined();

    const signupBtn = screen.getAllByRole("button", { name: "Sign Up" });
    await userEvent.click(signupBtn[1]);

    // sign up screen

    const mealInput = await screen.findByLabelText(/number of meals/i);

    await userEvent.type(mealInput, "30");

    const submitBtn = await screen.findByText("Sign Up");
    await userEvent.click(submitBtn);

    // confirmation screen
    const confirmation = await screen.findByText(/confirmation/i);
    expect(confirmation).toBeDefined();

    const date = await screen.findByText(
      RegExp(
        format(
          utcToZonedTime(hours2.time, "America/Los_Angeles"),
          "eeee, M/d/yy",
        ),
      ),
    );
    expect(date).toBeDefined();

    const chefLink = screen.getByRole("button", {
      name: "See your future and past shifts",
    });
    await userEvent.click(chefLink);
  });

  test("order home chef supplies", async () => {
    render(<App />, { wrapper: Root });

    const homeLink = await screen.findByAltText(/home chef header/i);
    await userEvent.click(homeLink);

    const resourcesBtn = await screen.findByText(/home chef resources/i);
    await userEvent.click(resourcesBtn);

    const suppliesBtn = await screen.findByText(/supplies/i);
    await userEvent.click(suppliesBtn);

    const addBoxesBtns = await screen.findAllByText("+");
    await userEvent.click(addBoxesBtns[addBoxesBtns.length - 1]);

    const submitBtn = await screen.findByText(/submit/i);
    await userEvent.click(submitBtn);

    const confirmMsg = await screen.findByText(/success/i);
    expect(confirmMsg).toBeDefined();
  });
});
