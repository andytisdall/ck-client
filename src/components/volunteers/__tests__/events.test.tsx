import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns-tz";
import { formatISO, addDays, addHours } from "date-fns";

import { createServer } from "../../../test/createServer";
import App from "../../../App";
import { Root } from "../../../setupTests";
import {
  VolunteerCampaign,
  Job,
  Shift,
  Volunteer,
  VolunteerHours,
} from "../../../state/apis/volunteerApi/types";

export const job1: Job = {
  id: "398y",
  name: "Meal Prep",
  shifts: [],
  active: true,
  location: "Location",
  ongoing: true,
  description: "kh",
  campaign: "wslejfn",
  region: "East Oakland",
};

export const shift1: Shift = {
  id: "383u8e78",
  startTime: formatISO(addDays(new Date(), 1)),
  endTime: formatISO(addHours(addDays(new Date(), 1), 5)),
  open: true,
  job: job1.id,
  restaurantMeals: false,
  duration: 5,
  slots: 3,
};

job1.shifts = [shift1];

export const eventCampaign: VolunteerCampaign = {
  name: "Holiday Cookies",
  id: "dw3h87hd8",
  startDate: formatISO(new Date()),
};

export const hours: VolunteerHours = {
  id: "f4397h",
  time: shift1.startTime,
  job: job1.id,
  status: "Confirmed",
  shift: shift1.id,
  campaign: "dw3h87",
};

export const hours2: VolunteerHours = {
  id: "fdw4df",
  time: shift1.startTime,
  job: job1.id,
  status: "Canceled",
  shift: shift1.id,
};

export const volunteer1: Volunteer = {
  id: "0037400000FU7XrAAL",
  householdId: "0017400000IG2QzAAL",
  portalUsername: undefined,
  firstName: "Andrew",
  name: "Andrew Tisdall",
  volunteerAgreement: true,
  email: "andrew@ck.com",
};

const timeout = 5000;

describe("volunteer does not exist already", () => {
  createServer([
    { path: "/user", res: async () => null },
    { path: "/volunteers/campaigns", res: async () => [eventCampaign] },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },
    { path: "/volunteers/:email", res: async () => null },
    { path: "/user/userInfo", res: async () => null },
    { path: "/volunteers", method: "post", res: async () => volunteer1 },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [hours, hours2],
    },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },
    {
      path: "/volunteers/driver",
      res: async () => null,
    },
  ]);

  test("navigate to volunteers home", async () => {
    render(<App />, { wrapper: Root });

    const volLink = await screen.findAllByText("CK Volunteers");
    await userEvent.click(volLink[1]);

    await waitFor(
      () => {
        screen.getByText("Special Event Volunteer Opportunities");
      },
      { timeout }
    );
  });

  test("create contact", async () => {
    render(<App />, { wrapper: Root });

    const eventLink = await screen.findByText(eventCampaign.name);
    await userEvent.click(eventLink);

    const email = "andrew@gmail.com";

    const emailInput = await screen.findByText("Email:");

    if (emailInput) {
      await userEvent.click(emailInput);
      await userEvent.type(emailInput, email + "[Enter]");
    }

    await waitFor(() => {
      const firstNameInputLabel = screen.getByText("First Name:");
      expect(firstNameInputLabel).toBeDefined();
    });

    const firstNameInputLabel = screen.getByText("First Name:");
    const lastNameInputLabel = screen.getByText("Last Name:");

    await userEvent.type(firstNameInputLabel, "New");
    await userEvent.type(lastNameInputLabel, "User[Enter]");

    await screen.findByText(RegExp(eventCampaign.name));
  });
});

describe("volunteer found", () => {
  createServer([
    { path: "/user", res: async () => null },
    { path: "/volunteers/campaigns", res: async () => [eventCampaign] },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },
    { path: "/volunteers/:email", res: async () => volunteer1 },
    { path: "/user/userInfo", res: async () => null },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [],
    },
    {
      path: "/volunteers/hours/:campaignId/",
      res: async () => [],
    },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      method: "delete",
      res: async () => null,
    },
    { path: "/volunteers/hours", method: "post", res: async () => hours },
    { path: "/sign/config", res: async () => ({ limitReached: false }) },
    { path: "sign/CKK/:idd/:id", res: async () => {} },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },
    {
      path: "/volunteers/hour/:hoursId",
      res: async () => hours,
    },
  ]);

  test("get job info and sign up for shift", async () => {
    render(<App />, { wrapper: Root });

    const jobLink = await screen.findByText(
      format(new Date(hours.time), "eee, M/d/yy")
    );
    expect(jobLink).toBeDefined();

    await userEvent.click(jobLink);

    const jobName = await screen.findByText(job1.name);
    expect(jobName).toBeDefined();

    const confirmSignup = await screen.findByText("Confirm Signup");
    await userEvent.click(confirmSignup);
  });

  test("cancel job signup", async () => {
    render(<App />, { wrapper: Root });

    const cancelBtn = await screen.findByText(/cancel/i);
    await userEvent.click(cancelBtn);
  });
});

describe("canceled hours", () => {
  createServer([
    { path: "/user", res: async () => null },
    { path: "/volunteers/campaigns", res: async () => [eventCampaign] },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },
    { path: "/user/userInfo", res: async () => null },
    {
      path: "/volunteers/hour/:hoursId",
      res: async () => ({ ...hours, status: "Canceled" }),
    },
  ]);

  test("see canceled hours", async () => {
    render(<App />, { wrapper: Root });

    const cancelMsg = await screen.findByText("You have canceled this shift:");
    await waitFor(
      () => {
        expect(cancelMsg).toBeDefined();
      },
      { timeout }
    );
  });
});
