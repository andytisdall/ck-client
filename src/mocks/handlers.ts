import { rest } from 'msw';

import * as data from './data';

const BASE = 'http://localhost:3001';

export const handlers = [
  rest.post(BASE + '/api/signin', (req, res, ctx) => {
    return res(ctx.json({ user: data.user1, token: 'token' }));
  }),
  rest.get(BASE + '/api/user', (req, res, ctx) => {
    if (window.localStorage.getItem('ck-token')) {
      return res(ctx.json(data.user1));
    } else {
      return res(ctx.status(403), ctx.json({ error: 'Unauthorized' }));
    }
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
    return res(ctx.json(data.homeChefHoursResponse));
  }),
  rest.post(BASE + '/api/home-chef/hours', (req, res, ctx) => {
    data.homeChefHoursResponse.push(data.hours2);
    return res(ctx.json(data.hours2));
  }),
  rest.get(BASE + '/api/meal-program/restaurant', (req, res, ctx) => {
    return res(ctx.json(data.restaurant1));
  }),

  rest.get(BASE + '/api/volunteers/events', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];
