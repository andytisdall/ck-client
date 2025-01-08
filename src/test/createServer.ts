import { setupServer } from 'msw/node';
import { rest } from 'msw';

interface Handler {
  path: string;
  method?: keyof typeof rest;
  res: (req: any, res: any, ctx: any) => any;
}

export const createServer = (handlerConfig: Handler[]) => {
  const handlers = handlerConfig.map((config) => {
    const method = rest[config.method || 'get'];
    return method(config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);
};
