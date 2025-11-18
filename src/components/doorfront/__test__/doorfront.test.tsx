import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { subDays, formatISO, getDate, addDays } from "date-fns";

import App from "../../../App";
import { User } from "../../../state/apis/authApi";
import {
  Client,
  ClientMeal,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import { createServer } from "../../../test/createServer";
import { Root } from "../../../setupTests";

const client: Client = {
  id: "client",
  barcode: ["293944747"],
};

const client2: Client = {
  id: "client",
  cCode: "4843",
  barcode: [],
};

const clientMeals: ClientMeal[] = [
  {
    client: client,
    date: formatISO(new Date()),
    id: "903933",
    amount: 4,
    logged: false,
  },
];

const clientMeals2: ClientMeal[] = [1, 2, 3, 4, 5, 6].map((i) => {
  const today = getDate(new Date());
  return {
    client: client,
    date:
      today < 15
        ? formatISO(subDays(new Date(), i))
        : formatISO(addDays(new Date(), i)),
    id: "903933",
    amount: 3,
    logged: false,
  };
});

const adminUser: User = {
  username: "bojee",
  id: "failjrse48jf48",
  admin: true,
  salesforceId: "f4s9jf4s9j",
  active: true,
};

describe("get client by barcode and add meals", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/meal-program/doorfront/scan/:scanValue",
      res: async () => ({ client, clientMeals: [] }),
    },

    {
      path: "/meal-program/doorfront/meals",
      method: "post",
      res: async (req) => null,
    },
    {
      path: "/meal-program/doorfront/client/:clientId",
      method: "patch",
      res: async (req) => {
        if (!req.body.barcode.length) {
          throw Error();
        }
        return null;
      },
    },
  ]);

  test("get client and add meals", async () => {
    render(<App />, { wrapper: Root });

    const adminBtn = await screen.findAllByText(/admin/i);
    await userEvent.click(adminBtn[0]);

    const doorfrontBtn = await screen.findByText(/doorfront/i);
    await userEvent.click(doorfrontBtn);

    const scanBtn = await screen.findByText(/scan/i);
    await userEvent.click(scanBtn);

    const scanInput = await screen.findByTestId(/scanner/i);
    await userEvent.type(scanInput, "38678[Enter]");

    const amount = await screen.findByRole("heading", { level: 3 });
    expect(amount).toHaveTextContent("1 meal");

    const plus = await screen.findByText("+");
    await userEvent.click(plus);
    await userEvent.click(plus);

    expect(amount).toHaveTextContent("3 meals");

    const submitBtn = screen.getByText(/submit/i);
    await userEvent.click(submitBtn);
    const manualBtn = await screen.findByText(/manually/i);
    expect(manualBtn).toBeDefined();
  });
});

describe("get client by c code and add meals", () => {
  createServer([
    { path: "/user", res: async () => adminUser },

    {
      path: "/meal-program/doorfront/client/lookup-by-client-number/:clientNumber",
      res: async () => ({ client: client2, clientMeals: [] }),
    },
    {
      path: "/meal-program/doorfront/meals",
      method: "post",
      res: async () => null,
    },
    {
      path: "/meal-program/doorfront/client/:clientId",
      method: "patch",
      res: async (req) => {
        if (!req.body.cCode) {
          throw Error();
        }
        return null;
      },
    },
  ]);

  test("get client by c code", async () => {
    render(<App />, { wrapper: Root });

    const manualBtn = await screen.findByText(/manually/i);
    userEvent.click(manualBtn);

    const manualInput = await screen.findByLabelText(/client id:/i);

    await userEvent.type(manualInput, "38383[enter]");
    const barcodeInput = await screen.findByLabelText(/barcode/i);
    expect(barcodeInput).toHaveTextContent("");
  });

  test("edit client", async () => {
    render(<App />, { wrapper: Root });
    const barcodeInput = await screen.findByLabelText(/barcode/i);
    expect(barcodeInput).toHaveTextContent("");

    await userEvent.type(barcodeInput, "84848484");
    const editClientBtn = await screen.findByText(/submit/i);
    await userEvent.click(editClientBtn);
    const scanText = await screen.findAllByText(/scan/i);
    expect(scanText).not.toHaveLength(0);
  });
});

describe("client has reached the limit for the day", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/meal-program/doorfront/scan/:scanValue",
      res: async () => ({ client, clientMeals }),
    },
  ]);

  test("daily limit reached", async () => {
    render(<App />, { wrapper: Root });
    const scanInput = await screen.findByTestId(/scanner/i);

    await userEvent.type(scanInput, "38678[Enter]");
    const msg = await screen.findByText(/daily limit reached/i);
    expect(msg).toBeDefined();

    const cancelBtn = screen.getByText(/cancel/i);
    await userEvent.click(cancelBtn);
  });
});

describe("client has reached the limit for the month", () => {
  createServer([
    { path: "/user", res: async () => adminUser },
    {
      path: "/meal-program/doorfront/scan/:scanValue",
      res: async () => ({ client, clientMeals: clientMeals2 }),
    },
    {
      path: "/meal-program/doorfront/client/:id",
      res: async () => null,
      method: "patch",
    },
  ]);

  test("monthly limit reached", async () => {
    render(<App />, { wrapper: Root });

    const scanInput = await screen.findByTestId(/scanner/i);
    await userEvent.type(scanInput, "38678[Enter]");
    // const msg = await screen.findByText(/monthly limit reached/i);
    // expect(msg).toBeDefined();
  });

  test("update client without adding meals", async () => {
    render(<App />, { wrapper: Root });
    const btn = await screen.findByText(
      /update client info without adding meals/i
    );
    const textInput = screen.getByLabelText(/client number/i);
    await userEvent.type(textInput, "12345");
    await userEvent.click(btn);

    const scanText = await screen.findByText(/scan barcode/i);
    expect(scanText).toBeDefined();
  });
});
