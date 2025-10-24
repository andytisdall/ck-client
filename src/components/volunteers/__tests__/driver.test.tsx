import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns-tz";
import { formatISO, addDays, addYears, addHours } from "date-fns";

import { createServer } from "../../../test/createServer";
import App from "../../../App";
import { Root } from "../../../setupTests";
import {
  VolunteerCampaign,
  Job,
  Shift,
  VolunteerHours,
} from "../../../state/apis/volunteerApi/types";
import { ContactInfo, User } from "../../../state/apis/authApi";
import { DriverInfo } from "../../../state/apis/volunteerApi/driver";
import config from "../config";

const userInfo: ContactInfo = {
  firstName: "Andy",
  lastName: "Tisdall",
  volunteerAgreement: true,
  foodHandler: true,
  homeChefAgreement: false,
  homeChefQuizPassed: false,
};

export const ckKitchenCampaign: VolunteerCampaign = {
  name: "CK Kitchen Volunteers",
  id: "dewneic",
};

export const driversCampaign: VolunteerCampaign = {
  name: "Drivers",
  id: config.deliveryDrivers.id,
};

const user: User = {
  username: "Andy",
  admin: false,
  active: true,
  salesforceId: "dfuehcfd",
  id: "oseifhjwosiefjc",
};

const driverJob: Job = {
  name: "Job 1",
  id: "eijfd",
  active: true,
  ongoing: true,
  campaign: driversCampaign.id,
  shifts: [],
  location: "CK Kitchen",
};

const driverShift: Shift = {
  startTime: formatISO(addDays(new Date(), 1)),
  endTime: formatISO(addHours(addDays(new Date(), 1), 3)),
  id: "cidhc",
  open: true,
  job: driverJob.id,
  duration: 3,
  slots: 1,
  distance: "5 mi",
  destination: "EOC",
  carSizeRequired: "Small",
};

driverJob.shifts = [driverShift];

const driver: DriverInfo = {
  volunteerAgreement: false,
  car: {},
};
const onboardedDriver: DriverInfo = {
  volunteerAgreement: true,
  car: {
    size: "Medium",
    make: "Honda",
    model: "HR-V",
    year: "2021",
    color: "black",
  },
  insuranceExpiration: formatISO(addYears(new Date(), 1)),
  licenseExpiration: formatISO(addYears(new Date(), 1)),
  driverStatus: "Active",
};

const newHour: VolunteerHours = {
  id: "aflkjefhc",
  time: driverShift.startTime,
  job: driverJob.id,
  status: "Confirmed",
  shift: driverShift.id,
  campaign: driversCampaign.id.substring(0, driversCampaign.id.length - 2),
};

describe("no user", () => {
  createServer([
    { path: "/user", res: async () => null },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, driversCampaign],
    },
    { path: "/volunteers/driver", res: async () => null },
  ]);

  test("rejected", async () => {
    render(<App />, { wrapper: Root });
    const volunteerLinks = await screen.findAllByText(/ck volunteers/i);
    await userEvent.click(volunteerLinks[1]);
    const driverLink = await screen.findByText(/drivers/i);
    await userEvent.click(driverLink);

    const noUserText = await screen.findByText(/register as a volunteer here/i);
    expect(noUserText).toBeDefined();
    // await userEvent.click(noUserText);

    // const volunteerFormText = await screen.findByText(
    //   /CK Cooking Volunteer Opportunities/i
    // );
    // expect(volunteerFormText).toBeDefined();
  });
});

describe("onboarding", () => {
  createServer([
    { path: "/user", res: async () => user },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [],
    },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, driversCampaign],
    },
    { path: "/volunteers/driver", res: async () => driver },
    { path: "/sign/DRV", res: async () => ({ signingUrl: "" }) },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [driverJob],
    },
  ]);

  test("go to onboarding home", async () => {
    render(<App />, { wrapper: Root });

    const onboardingText = await screen.findByText(
      /You must complete onboardin/i
    );
    expect(onboardingText).toBeDefined();
  });

  test("upload license", async () => {
    render(<App />, { wrapper: Root });

    const licenseText = await screen.findByText(/license/i);
    await userEvent.click(licenseText);

    const fileText = await screen.findByText(/choose file/i);
    expect(fileText).toBeDefined();

    const back = await screen.findByText(/back/i);
    await userEvent.click(back);
  });

  test("upload insurance", async () => {
    render(<App />, { wrapper: Root });

    const licenseText = await screen.findByText(/insurance/i);
    await userEvent.click(licenseText);

    const fileText = await screen.findByText(/choose file/i);
    expect(fileText).toBeDefined();

    const back = await screen.findByText(/back/i);
    await userEvent.click(back);
  });

  test("sign agreement", async () => {
    render(<App />, { wrapper: Root });

    const agreementText = await screen.findByText(/agreement/i);
    await userEvent.click(agreementText);

    const documentText = await screen.findByText(/document/i);
    expect(documentText).toBeDefined();

    const backText = await screen.findByText(/back/i);
    await userEvent.click(backText);
  });

  test("enter car info", async () => {
    render(<App />, { wrapper: Root });

    const carText = await screen.findByText(/vehicle/i);
    await userEvent.click(carText);

    const sizeText = await screen.findByText(
      /Enter your vehicle's information/i
    );
    expect(sizeText).toBeDefined();
    const back = screen.getByText(/back/i);
    await userEvent.click(back);
  });
});

describe("sign up", () => {
  createServer([
    { path: "/user", res: async () => user },
    { path: "/user/userInfo", res: async () => userInfo },
    {
      path: "/volunteers/campaigns",
      res: async () => [ckKitchenCampaign, driversCampaign],
    },
    { path: "/volunteers/driver", res: async () => onboardedDriver },
    { path: "/sign/DRV", res: async () => ({}) },
    {
      path: "/volunteers/jobs/:campaignId",
      res: async () => [driverJob],
    },
    {
      path: "/volunteers/hours/:campaignId/:contactId",
      res: async () => [],
    },
    {
      path: "/volunteers/hours/:contactId",
      res: async () => [],
    },
    {
      path: "/volunteers/hours",
      method: "post",
      res: async () => newHour,
    },
    { path: "/volunteers/hour/:hourId", res: async () => newHour },
    {
      path: "/volunteers/hours/:hoursId/:contactId",
      method: "delete",
      res: async () => null,
    },
  ]);

  test("onboarding complete", async () => {
    render(<App />, { wrapper: Root });

    const readyText = await screen.findByText(/You are ready to transport/i);
    expect(readyText).toBeDefined();
    const continueBtn = screen.getByText(/continue/i);
    await userEvent.click(continueBtn);
  });

  test("find job list", async () => {
    render(<App />, { wrapper: Root });

    const date = await screen.findByText(
      RegExp(format(new Date(driverShift.startTime), "eee, M/d/yy"))
    );

    await userEvent.click(date);
  });

  test("sign up for shift", async () => {
    render(<App />, { wrapper: Root });

    const distanceText = await screen.findByText(driverShift.destination!);
    expect(distanceText).toBeDefined();
    const signupBtn = screen.getByText(/Confirm Signup/i);
    await userEvent.click(signupBtn);
  });

  test("confirm shift", async () => {
    render(<App />, { wrapper: Root });

    const confirmText = await screen.findByText(
      /You have successfully signed up for this shift/i
    );
    expect(confirmText).toBeDefined();
  });

  test("cancel shift", async () => {
    render(<App />, { wrapper: Root });

    const cancelBtn = await screen.findByText(/cancel/i);
    await userEvent.click(cancelBtn);
  });
});
