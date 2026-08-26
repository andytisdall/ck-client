import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createServer } from "../../../test/createServer";
import App from "../../../App";
import { Root } from "../../../test/setupTests";
import { Job, User, SendTextResponse } from "@community-kitchens/apiinterfaces";

const user: User = {
  username: "chompy",
  id: "48yrf848fy48",
  admin: true,
  salesforceId: "d093900",
  active: true,
};

const fridge1: Job = {
  name: "First Fridge",
  id: "3wudh",
  shifts: [],
  active: true,
  ongoing: true,
  campaign: "o38h",
  region: "East Oakland",
};

const fridge2: Job = {
  name: "Second Fridge",
  id: "dfe",
  shifts: [],
  active: true,
  ongoing: true,
  campaign: "o38h",
  region: "Berkeley",
};

const photoUrl =
  "https://storage.googleapis.com/coherent-vision-368820.appspot.com/2023-02-09-02-57-am.jpg";

const sendTextResponse: SendTextResponse = {
  message: "Sample Message",
  region: "EAST_OAKLAND",
  photoUrl,
  number: "",
};

jest.setTimeout(11000);

describe("Send texts", () => {
  createServer([
    { path: "/user", res: async () => user },
    { path: "/home-chef/fridges", res: async () => [fridge1, fridge2] },
    {
      path: "/text/outgoing",
      res: async () => sendTextResponse,
      method: "post",
    },
  ]);

  test("Navigate to text page", async () => {
    render(<App />, { wrapper: Root });

    const textLink = await screen.findAllByText("Text Service");
    if (textLink[0]) {
      await userEvent.click(textLink[0]);
    }

    // text home
    const headerText = await screen.findByRole("heading", {
      level: 1,
      name: "Text Service",
    });
    expect(headerText).toBeDefined();
  });

  test("Send a town fridge text alert", async () => {
    render(<App />, { wrapper: Root });

    const sendTextBtn = await screen.findByText(
      "Send a Town Fridge Delivery Alert",
    );
    await userEvent.click(sendTextBtn);

    const regionSelect = await screen.findByLabelText(/town fridge location/i);
    await userEvent.click(regionSelect);
    await screen.findByText(/second fridge/i);
    await userEvent.selectOptions(regionSelect, "Second Fridge");

    const name = await screen.findByLabelText(/name of meal/i);
    await userEvent.click(name);
    await userEvent.keyboard("Food");

    let file = new File(["fdefd"], "test.png", {
      type: "image/png",
    });
    const fileInput = screen.getByLabelText(/upload photo/i);
    await userEvent.upload(fileInput, file);

    const previewBtn = screen.getByText(/preview/i);
    await userEvent.click(previewBtn);

    const confirmText = await screen.findByText(`Region: ${fridge2.region}`);
    expect(confirmText).toBeInTheDocument();

    const sendBtn = screen.getByText(/send message/i);
    await userEvent.click(sendBtn);

    const successMsg = await screen.findByText(
      /You have successfully sent this text/i,
    );
    expect(successMsg).toBeInTheDocument();

    await waitFor(
      () => {
        const imgPreview = screen.getByRole("img", { name: /attached/i });
        expect(imgPreview).toHaveAttribute("src", sendTextResponse.photoUrl);
      },
      { timeout: 5000 },
    );

    const backBtn = screen.getByText(/back/i);
    await userEvent.click(backBtn);
  });

  test("Send a custom text alert", async () => {
    render(<App />, { wrapper: Root });

    const sendTextBtn = await screen.findByText("Send a Custom Alert");
    await userEvent.click(sendTextBtn);

    const regionSelect = await screen.findByLabelText(/all regions/i);
    await userEvent.click(regionSelect);

    const name = await screen.findByLabelText(/message/i);
    await userEvent.click(name);
    await userEvent.keyboard("Food");

    const fileInput = screen.getByLabelText(/paste photo url/i);
    await userEvent.type(fileInput, photoUrl);
    await waitFor(
      () => {
        const imgPreview = screen.getByRole("img", { name: /meal/i });
        expect(imgPreview).toHaveAttribute("src", photoUrl);
      },
      { timeout: 5000 },
    );

    const previewBtn = screen.getByText(/preview/i);
    await userEvent.click(previewBtn);

    const confirmText = await screen.findByText("Region: all");
    expect(confirmText).toBeInTheDocument();

    const sendBtn = screen.getByText(/send message/i);
    await userEvent.click(sendBtn);

    const successMsg = await screen.findByText(
      /You have successfully sent this text/i,
    );
    expect(successMsg).toBeInTheDocument();

    const backBtn = screen.getByText(/back/i);
    await userEvent.click(backBtn);
  });

  test("Send a custom text alert to a single number", async () => {
    render(<App />, { wrapper: Root });

    const sendTextBtn = await screen.findByText("Send a Custom Alert");
    await userEvent.click(sendTextBtn);

    const name = await screen.findByLabelText(/message/i);
    await userEvent.type(name, "Food");

    const to = await screen.findByLabelText(/phone number/i);
    await userEvent.type(to, "4158190251");

    const previewBtn = screen.getByText(/preview/i);
    await userEvent.click(previewBtn);

    const confirmText = await screen.findByText("To: 4158190251");
    expect(confirmText).toBeInTheDocument();

    const sendBtn = screen.getByText(/send message/i);
    await userEvent.click(sendBtn);

    const successMsg = await screen.findByText(
      /You have successfully sent this text/i,
    );
    expect(successMsg).toBeInTheDocument();
  });
});
