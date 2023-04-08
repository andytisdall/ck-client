import { rest } from 'msw';

import * as data from './data';

const BASE = 'http://localhost:3001';

export const handlers = [
  rest.post(BASE + '/api/signin', (req, res, ctx) => {
    return res(ctx.json({ user: data.user1 }));
  }),
  rest.get(BASE + '/api/user', (req, res, ctx) => {
    return res(ctx.json(data.user1));
  }),
  rest.get(BASE + '/api/user/userInfo', (req, res, ctx) => {
    return res(ctx.json(data.userInfo1));
  }),
  rest.get(BASE + '/api/restaurant', (req, res, ctx) => {
    return res(ctx.json(data.restaurant1));
  }),
  rest.get(BASE + '/api/home-chef/campaign', (req, res, ctx) => {
    return res(ctx.json(data.campaign));
  }),
  rest.get(BASE + '/api/home-chef/job-listing', (req, res, ctx) => {
    return res(ctx.json(data.jobs));
  }),
  rest.get(BASE + '/api/home-chef/hours', (req, res, ctx) => {
    return res(ctx.json([data.hours1]));
  }),
];
