import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../../../App";
import Root from "../../../Root";
import { createServer } from "../../../test/createServer";
import { User } from "../../../state/apis/authApi";
import {
  CheckInShiftsResponse,
  VolunteerForCheckIn,
} from "../../../state/apis/volunteerApi/checkInApi";
import { Volunteer } from "../../../state/apis/volunteerApi/types";

const adminUser: User = {
  username: "bojee",
  id: "failjrse48jf48",
  admin: true,
  salesforceId: "f4s9jf4s9j",
  active: true,
};

const volunteer1: VolunteerForCheckIn = {
  hoursId: "iow84hy",
  contactId: "w8hrc",
  firstName: "Jamie",
  lastName: "Lannister",
  email: "m.com",
  volunteerAgreement: true,
  status: "Confirmed",
};

const volunteer2: VolunteerForCheckIn = {
  hoursId: "3wf4",
  contactId: "dih",
  firstName: "Ned",
  lastName: "Stark",
  email: "mo.com",
  volunteerAgreement: false,
  status: "Confirmed",
};

const newVolunteer: Volunteer = {
  email: "somthing@e.com",
  id: volunteer1.contactId,
  householdId: "dwo8hd",
  volunteerAgreement: false,
};

const getShiftsResponse: CheckInShiftsResponse = {
  sampleJob: [
    { id: "3o8dh", job: "CK Kitchen", startTime: new Date().toString() },
  ],
};

describe("volunteer not checked in", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/volunteers/check-in/shifts",
      res: async () => getShiftsResponse,
    },
    {
      path: "/volunteers/check-in/:shiftId",
      res: async () => [volunteer1, volunteer2],
    },
    { path: "/volunteers/check-in", method: "post", res: async () => null },
  ]);

  test("See today's volunteers", async () => {
    render(<App />, { wrapper: Root });

    const adminBtn = await screen.findAllByText(/admin/i);
    await userEvent.click(adminBtn[0]);

    const volunteerCheckInBtn = await screen.findByText(/volunteer check-in/i);
    await userEvent.click(volunteerCheckInBtn);

    const kitchenBtn = await screen.findByText(/kitchen/i);
    await userEvent.click(kitchenBtn);
  });

  test("Check in volunteer", async () => {
    render(<App />, { wrapper: Root });

    const volunteer1Btn = await screen.findByRole("link", {
      name: RegExp(volunteer1.lastName),
    });
    await userEvent.click(volunteer1Btn);

    const checkInBtn = await screen.findByText(/check in/i);
    await userEvent.click(checkInBtn);

    const success = await screen.findByText(/successfully/i);
    expect(success).toBeInTheDocument();
  });
});

describe("volunteer is checked in", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/volunteers/check-in/shifts",
      res: async () => getShiftsResponse,
    },
    {
      path: "/volunteers/check-in/:shiftId",
      res: async () => [{ ...volunteer1, status: "Completed" }, volunteer2],
    },
    { path: "/volunteers/check-in", method: "post", res: async () => null },
  ]);

  test("See checked in volunteer", async () => {
    render(<App />, { wrapper: Root });

    await waitFor(
      async () => {
        const volunteer1Name = screen.getByText(RegExp(volunteer1.lastName));
        expect(volunteer1Name).toBeInTheDocument();
      },
      { timeout: 3500 }
    );

    const volunteer1Btn = screen.queryByRole("link", {
      name: RegExp(volunteer1.lastName),
    });
    expect(volunteer1Btn).not.toBeInTheDocument();
  });
});

describe("agreement not signed and limit not reached", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/volunteers/check-in/shifts",
      res: async () => getShiftsResponse,
    },
    {
      path: "/volunteers/check-in/:shiftId",
      res: async () => [volunteer1, volunteer2],
    },
  ]);

  test("prompted to sign", async () => {
    render(<App />, { wrapper: Root });

    const volunteer1Btn = await screen.findByRole("link", {
      name: RegExp(volunteer2.lastName),
    });
    await userEvent.click(volunteer1Btn);

    const signLink = await screen.findByText(/sign the agreement/i);
    expect(signLink).toBeInTheDocument();

    const startOverBtn = await screen.findByText(/start over/i);
    await userEvent.click(startOverBtn);
  });
});

describe("volunteer not on list and not in salesforce", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/volunteers/check-in/shifts",
      res: async () => getShiftsResponse,
    },
    {
      path: "/volunteers/check-in/:shiftId",
      res: async () => [volunteer1, volunteer2],
    },
    { path: "/volunteers/:email", res: async () => null },
    {
      path: "/volunteers",
      method: "post",
      res: async () => newVolunteer,
    },
    {
      path: "/volunteers/check-in/hours",
      method: "post",
      res: async () => ({
        id: "kuh",
      }),
    },
  ]);

  test("create a new contact", async () => {
    render(<App />, { wrapper: Root });

    const newVolunteerBtn = await screen.findByText(/new volunteer/i);
    await userEvent.click(newVolunteerBtn);
    const firstNameField = await screen.findByLabelText(/first name/i);
    await userEvent.type(firstNameField, "FirstName");
    const lastNameField = await screen.findByLabelText(/last name/i);
    await userEvent.type(lastNameField, "LastName");
    const emailField = await screen.findByLabelText(/email/i);
    await userEvent.type(emailField, "Email@gmail.com");
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitBtn);

    const signLink = await screen.findByText(/sign the agreement/i);
    expect(signLink).toBeInTheDocument();

    const startOverBtn = screen.getByText(/start over/i);
    await userEvent.click(startOverBtn);
  });
});

describe("volunteer not on list but does exist in salesforce", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/volunteers/check-in/shifts",
      res: async () => ({
        sampleJob: [
          { id: "3o8dh", job: "CK Kitchen", startTime: new Date().toString() },
        ],
      }),
    },
    {
      path: "/volunteers/check-in/:shiftId",
      res: async () => [volunteer1, volunteer2],
    },
    { path: "/volunteers/:email", res: async () => newVolunteer },

    {
      path: "/volunteers/check-in/hours",
      method: "post",
      res: async () => ({ id: "kjh" }),
    },
  ]);

  test("find existing contact", async () => {
    render(<App />, { wrapper: Root });

    const newVolunteerBtn = await screen.findByText(/new volunteer/i);
    await userEvent.click(newVolunteerBtn);
    const firstNameField = await screen.findByLabelText(/first name/i);
    await userEvent.type(firstNameField, "FirstName");
    const lastNameField = await screen.findByLabelText(/last name/i);
    await userEvent.type(lastNameField, "LastName");
    const emailField = await screen.findByLabelText(/email/i);
    await userEvent.type(emailField, "Email@gmail.com");
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitBtn);

    const signLink = await screen.findByText(/sign the agreement/i);
    expect(signLink).toBeInTheDocument();
  });
});

describe("not authorized", () => {
  createServer([
    { path: "/user", res: async () => ({ ...adminUser, admin: false }) },
  ]);

  test("Unauthorized if not admin", async () => {
    render(<App />, { wrapper: Root });

    const permission = await screen.findByText(/permission/i);
    expect(permission).toBeInTheDocument();
  });
});
