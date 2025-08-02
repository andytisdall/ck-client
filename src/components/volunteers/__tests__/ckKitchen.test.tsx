import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format, utcToZonedTime } from "date-fns-tz";
import { formatISO, addDays } from "date-fns";

import { createServer } from "../../../test/createServer";
import App from "../../../App";
import { Root } from "../../../setupTests";
import {
  VolunteerCampaign,
  Job,
  Shift,
  VolunteerHours,
  Volunteer,
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
  id: "4i3ghd",
  startTime: formatISO(addDays(new Date(), 1)),
  open: true,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 3,
};

export const shift2: Shift = {
  id: "dei8hdew",
  startTime: formatISO(addDays(new Date(), 2)),
  open: false,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 0,
};

job1.shifts = [shift1, shift2];

export const ckKitchenCampaign: VolunteerCampaign = {
  name: "CK Kitchen Volunteers",
  id: "dewneic",
};

export const ckDoorCampaign: VolunteerCampaign = {
  name: "Door Distribution",
  id: "dfli",
};

export const hours: VolunteerHours = {
  id: "f4397h",
  time: shift1.startTime,
  job: job1.id,
  status: "Confirmed",
  shift: shift1.id,
  campaign: ckKitchenCampaign.id,
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

describe("volunteer not found", () => {
  createServer([
    { path: "/user", res: async () => null },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, ckDoorCampaign],
    },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },
    { path: "/volunteers/:email", res: async () => null },
    { path: "/user/userInfo", res: async () => null },
    { path: "/volunteers", method: "post", res: async () => volunteer1 },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [hours],
    },
  ]);

  test("navigate to CK Kitchen home", async () => {
    render(<App />, { wrapper: Root });

    const volLink = await screen.findAllByText("CK Volunteers");
    await userEvent.click(volLink[1]);

    // kitchen home
    const headerText = await screen.findByRole("heading", {
      level: 1,
      name: "CK Volunteers",
    });

    expect(headerText).toBeDefined();
  });

  test("create contact and see list of jobs", async () => {
    render(<App />, { wrapper: Root });

    const kitchenLink = await screen.findByText("CK Kitchen Volunteers");
    await userEvent.click(kitchenLink);

    const email = "andrew@gmail.com";

    const emailInput = await screen.findByText("Email:");
    await userEvent.click(emailInput);
    await userEvent.type(emailInput, email + "[Enter]");

    await waitFor(() => {
      const firstNameInputLabel = screen.getByText("First Name:");
      expect(firstNameInputLabel).toBeDefined();
    });

    const firstNameInputLabel = screen.getByText("First Name:");
    const lastNameInputLabel = screen.getByText("Last Name:");

    await userEvent.type(firstNameInputLabel, "New");
    setTimeout(() => {
      userEvent.type(lastNameInputLabel, "User[Enter]");
    }, 50);

    await waitFor(() => {
      const jobName = screen.getByText("Positions Available");
      expect(jobName).toBeDefined();
    });
  });
});

describe("volunteer found", () => {
  createServer([
    { path: "/user", res: async () => null },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, ckDoorCampaign],
    },
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
      path: "/volunteers/hours",
      method: "post",
      res: async () => hours,
    },
    { path: "/sign/config", res: async () => ({ limitReached: false }) },
    { path: "/sign/CKK/:idd/:id", res: async () => {} },
  ]);

  test("get job info and sign up for shift", async () => {
    render(<App />, { wrapper: Root });

    // const signedUpShift = await screen.findByText(/signed up/i);

    const jobLink = await screen.findByText(
      format(utcToZonedTime(hours.time, "America/Los_Angeles"), "eee, M/d/yy")
    );
    expect(jobLink).toBeDefined();

    await userEvent.click(jobLink);

    const jobName = await screen.findByText(job1.name);
    expect(jobName).toBeDefined();

    const confirmSignup = await screen.findByText("Confirm Signup");
    await userEvent.click(confirmSignup);

    // const sign = await screen.findByText(/sign this document/i);
  });
});

describe("signed up for shift", () => {
  createServer([
    { path: "/user", res: async () => null },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, ckDoorCampaign],
    },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },
    { path: "/volunteers/:email", res: async () => volunteer1 },
    { path: "/user/userInfo", res: async () => null },
    {
      path: "/volunteers/hours/:campaignId/",
      res: async () => [],
    },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [hours],
    },
    {
      path: "/volunteers/hour/:hoursId",
      res: async () => hours,
    },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      method: "delete",
      res: async () => null,
    },
  ]);

  test("see signed up shift", async () => {
    render(<App />, { wrapper: Root });

    const confirmationMsg = await screen.findByText(
      "You have successfully signed up for this shift:"
    );
    await waitFor(
      () => {
        expect(confirmationMsg).toBeDefined();
      },
      { timeout: 500 }
    );
  });

  test("cancel job signup", async () => {
    render(<App />, { wrapper: Root });
    const backBtn = await screen.findByText(/back/i);
    await userEvent.click(backBtn);

    const calLink = await screen.findByText(/calendar/i);
    await userEvent.click(calLink);
    // const arrow = await screen.findByText(/→/);
    // await userEvent.click(arrow);
    const jobLink = await screen.findByText(/signed up/i);
    expect(jobLink).toBeDefined();

    await userEvent.click(jobLink);

    const cancelBtn = await screen.findByText(
      "Cancel Your Booked Volunteer Time"
    );
    await userEvent.click(cancelBtn);
  });
});
