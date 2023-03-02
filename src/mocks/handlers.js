import { rest } from 'msw';

const BASE = 'http://localhost:3001';

export const handlers = [
  rest.get(BASE + '/api/titles/:id', (req, res, ctx) => {
    return res(ctx.json([{ data: 'Hi' }]));
  }),
];
