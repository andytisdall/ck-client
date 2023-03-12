import { rest } from 'msw';

import { user1 } from './data';

const BASE = 'http://localhost:3001';

export const handlers = [
  rest.post(BASE + '/api/signin', (req, res, ctx) => {
    return res(ctx.json([{ data: user1 }]));
  }),
];
