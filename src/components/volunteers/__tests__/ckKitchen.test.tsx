import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format, utcToZonedTime } from "date-fns-tz";
import { formatISO, addDays, addHours, lastDayOfMonth } from "date-fns";

import { createServer } from "../../../test/createServer";
import App from "../../../App";
import { Root } from "../../../test/setupTests";
import {
  VolunteerCampaign,
  Job,
  VolunteerShift,
  VolunteerHours,
  Volunteer,
  ContactInfo,
  User,
} from "@community-kitchens/apiinterfaces";

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

export const shift1: VolunteerShift = {
  id: "4i3ghd",
  startTime: formatISO(addDays(new Date(), 1)),
  // endTime: formatISO(addHours(addDays(new Date(), 1), 3)),
  open: true,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 3,
};

export const shift2: VolunteerShift = {
  id: "dei8hdew",
  startTime: formatISO(addDays(new Date(), 2)),
  // endTime: formatISO(addHours(addDays(new Date(), 1), 3)),
  open: false,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 0,
  totalSlots: 2,
  reservedOpen: true,
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

export const hours2: VolunteerHours = {
  id: "456456",
  time: shift2.startTime,
  job: job1.id,
  status: "Confirmed",
  shift: shift2.id,
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

export const volunteer2: ContactInfo = {
  firstName: "Andrew",
  volunteerAgreement: false,
  calfreshVolunteer: true,
  lastName: "finkle",
  homeChefAgreement: false,
  homeChefQuizPassed: false,
  foodHandler: false,
};

export const user: User = {
  username: "Andy",
  admin: false,
  active: false,
  salesforceId: volunteer1.id,
  id: "987",
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
      res: async () => [],
    },
    {
      path: "/volunteers/hours/:campaignId/",
      res: async () => null,
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

    await waitFor(() => {
      const header = screen.getByText("Positions Available");
      expect(header).toBeDefined();
    });

    const calendarBtn = screen.getByText(/calendar/i);

    await userEvent.click(calendarBtn);

    if (
      format(new Date(), "yyyy-MM-dd") ===
      format(lastDayOfMonth(new Date()), "yyyy-MM-dd")
    ) {
      const arrow = await screen.findByText(/→/);
      await userEvent.click(arrow);
    }

    const jobLink = await screen.findAllByText(
      format(utcToZonedTime(hours.time, "America/Los_Angeles"), "h:mm a"),
    );
    expect(jobLink).toBeDefined();

    await userEvent.click(jobLink[0]);

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

    const signupBtn = await screen.findByText(/confirm signup/i);
    // const signupBtn = await screen.findByText(/breg/i);

    expect(signupBtn).toBeDefined();

    const backBtn = await screen.findByText(/back/i);
    await userEvent.click(backBtn);
  });
});

describe("volunteer looked up and found", () => {
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
    {
      path: "/volunteers/:email",
      res: async () => volunteer1,
    },
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
    { path: "/sign/CKK/:idd/:id", res: async () => {} },
  ]);

  test("look up existing volunteer", async () => {
    render(<App />, { wrapper: Root });

    const kitchenLink = await screen.findByText("CK Kitchen Volunteers");
    await userEvent.click(kitchenLink);

    const header = await screen.findByText("Positions Available");
    expect(header).toBeDefined();

    const jobLink = await screen.findAllByText(
      RegExp(
        format(
          utcToZonedTime(hours.time, "America/Los_Angeles"),
          "eee, M/d/yy",
        ),
      ),
    );
    expect(jobLink).toBeDefined();

    await userEvent.click(jobLink[0]);

    const email = "andrew@gmail.com";
    const emailInput = await screen.findByText("Email:");
    await userEvent.click(emailInput);
    await userEvent.type(emailInput, email + "[Enter]");

    const confirmSignup = await screen.findByText("Confirm Signup");
    await userEvent.click(confirmSignup);
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
      res: async () => [hours],
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

    const backBtn = await screen.findByText(/back/i);
    await userEvent.click(backBtn);

    const signInLink = await screen.findByText(/enter email/i);
    await userEvent.click(signInLink);

    const email = "andrew@gmail.com";
    const emailInput = await screen.findByText("Email:");
    await userEvent.click(emailInput);
    await userEvent.type(emailInput, email);
    const submitBtns = await screen.findAllByText(/submit/i);
    await userEvent.click(submitBtns[1]);

    const shift = await screen.findByText(/✓/);
    await userEvent.click(shift);

    const confirmationMsg = await screen.findByText(
      "You have successfully signed up for this shift:",
    );
    await waitFor(
      () => {
        expect(confirmationMsg).toBeDefined();
      },
      { timeout: 500 },
    );
  });

  test("cancel job signup", async () => {
    render(<App />, { wrapper: Root });
    const backBtn = await screen.findByText(/back/i);
    await userEvent.click(backBtn);

    const calLink = await screen.findByText(/calendar/i);
    await userEvent.click(calLink);

    if (
      format(new Date(), "yyyy-MM-dd") ===
      format(lastDayOfMonth(new Date()), "yyyy-MM-dd")
    ) {
      const arrow = await screen.findByText(/→/);
      await userEvent.click(arrow);
    }

    const jobLink = await screen.findByText(/✓/);
    expect(jobLink).toBeDefined();

    await userEvent.click(jobLink);

    const cancelBtn = await screen.findByText(
      "Cancel Your Booked Volunteer Time",
    );
    await userEvent.click(cancelBtn);
  });
});

describe("sign up for reserved shift", () => {
  createServer([
    { path: "/user", res: async () => user },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, ckDoorCampaign],
    },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },

    { path: "/user/userInfo", res: async () => volunteer2 },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [],
    },
    {
      path: "/volunteers/hours/:campaignId/",
      res: async () => [],
    },
    {
      path: "/volunteers/hours/reserved",
      method: "post",
      res: async () => hours,
    },
    {
      path: "/volunteers/hour/:hoursId",
      res: async () => hours,
    },
    { path: "/volunteers/driver", res: async () => null },
  ]);

  test("sign up for reserved shift", async () => {
    render(<App />, { wrapper: Root });

    const volunteerLinks = await screen.findAllByText("CK Volunteers");
    await userEvent.click(volunteerLinks[0]);

    const kitchenLink = await screen.findByText("CK Kitchen Volunteers");
    await userEvent.click(kitchenLink);

    const jobLink = await screen.findByText("1 Volunteer Needed");
    expect(jobLink).toBeDefined();

    await userEvent.click(jobLink);

    const confirmSignup = await screen.findByText("Confirm Signup");
    expect(confirmSignup).toBeInTheDocument();
  });
});

describe("denied for reserved shift", () => {
  createServer([
    { path: "/user", res: async () => user },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, ckDoorCampaign],
    },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [job1],
    },

    {
      path: "/user/userInfo",
      res: async () => ({ ...volunteer2, calfreshVolunteer: false }),
    },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [],
    },
    {
      path: "/volunteers/hours/:campaignId/",
      res: async () => [],
    },

    {
      path: "/volunteers/hour/:hoursId",
      res: async () => hours,
    },
    { path: "/volunteers/driver", res: async () => null },
  ]);

  test("sign up for reserved shift", async () => {
    render(<App />, { wrapper: Root });

    const volunteerLinks = await screen.findAllByText("CK Volunteers");
    await userEvent.click(volunteerLinks[0]);

    const kitchenLink = await screen.findByText("CK Kitchen Volunteers");
    await userEvent.click(kitchenLink);

    const jobLink = await screen.findByText("No Signups Available");
    expect(jobLink).toBeDefined();
  });
});
