import { setupServer } from "msw/node";
import { rest } from "msw";

import { store } from "../state/store";
import { api } from "../state/api";

interface Handler {
  path: string;
  method?: keyof typeof rest;
  res: (req: any) => Promise<any>;
}

export const createServer = (handlerConfig: Handler[]) => {
  const handlers = handlerConfig.map((config) => {
    const method = rest[config.method || "get"];
    return method(
      "http://localhost:3001/api" + config.path,
      async (req: any, res: any, ctx: any) => {
        const response = await config.res(req);
        return res(ctx.json(response));
      }
    );
  });

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  beforeEach(() => {
    store.dispatch(api.util.resetApiState());
    store.dispatch({ type: "volunteer/reset" });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};
