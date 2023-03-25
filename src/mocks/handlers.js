import { rest } from 'msw';

import * as data from './data';

const BASE = 'http://localhost:3001';

export const handlers = [
  rest.post(BASE + '/api/signin', (req, res, ctx) => {
    return res(ctx.json({ user: data.user1 }));
  }),
  rest.get(BASE + '/api/user/userInfo', (req, res, ctx) => {
    return res(ctx.json(data.userInfo1));
  }),
];
