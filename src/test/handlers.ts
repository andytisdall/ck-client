// import { rest } from 'msw';

// import * as data from './data';
// import { VolunteerHours } from '../state/apis/volunteerApi';

// const BASE = 'http://localhost:3001';

// const getHoursResponse: VolunteerHours[] = [data.hours1];

// export const handlers = [
//   rest.post(BASE + '/api/signin', async (req, res, ctx) => {
//     return res(ctx.json({ user: data.user1, token: 'auth' }));
//   }),

//   rest.get(BASE + '/api/user', (req, res, ctx) => {
//     const token = window.localStorage.getItem('ck-token');

//     if (token === 'admin') {
//       return res(ctx.json(data.user1));
//     } else if (token === 'auth') {
//       return res(ctx.json(data.user2));
//     } else {
//       return res(ctx.json(null));
//     }
//   }),
//   rest.get(BASE + '/api/user/userInfo', (req, res, ctx) => {
//     return res(ctx.json(data.userInfo1));
//   }),
//   rest.get(BASE + '/api/restaurant', (req, res, ctx) => {
//     return res(ctx.json(data.restaurant1));
//   }),
//   rest.get(BASE + '/api/home-chef/campaign', (req, res, ctx) => {
//     return res(ctx.json(data.campaign));
//   }),
//   rest.get(BASE + '/api/home-chef/job-listing', (req, res, ctx) => {
//     return res(ctx.json(data.jobs));
//   }),
//   rest.get(BASE + '/api/home-chef/hours', (req, res, ctx) => {
//     return res(ctx.json(data.homeChefHoursResponse));
//   }),
//   rest.post(BASE + '/api/home-chef/hours', (req, res, ctx) => {
//     data.homeChefHoursResponse.push(data.hours2);
//     return res(ctx.json(data.hours2));
//   }),
//   rest.get(BASE + '/api/meal-program/restaurant', (req, res, ctx) => {
//     return res(ctx.json(data.restaurant1));
//   }),

//   rest.get(BASE + '/api/volunteers/events', (req, res, ctx) => {
//     return res(ctx.json([data.ckKitchenCampaign, data.eventCampaign]));
//   }),

//   rest.get(BASE + '/api/volunteers/:email', (req, res, ctx) => {
//     const email = req.params.email;
//     if (email === 'andrew.tisdall@gmail.com') {
//       return res(ctx.json(data.volunteer1));
//     }
//     if (email === 'something@something.com') {
//       return res(ctx.json(data.volunteer2));
//     }
//     return res(ctx.json(null));
//   }),

//   rest.post(BASE + '/api/volunteers', (req, res, ctx) => {
//     return res(ctx.json(data.volunteer1));
//   }),

//   rest.get(BASE + '/api/volunteers/hours/:campaignId/', (req, res, ctx) => {
//     return res(ctx.json(getHoursResponse));
//   }),

//   rest.get(
//     BASE + '/api/volunteers/hours/:campaignId/:contactId',
//     (req, res, ctx) => {
//       return res(ctx.json(getHoursResponse));
//     }
//   ),

//   rest.post(BASE + '/api/volunteers/hours', (req, res, ctx) => {
//     getHoursResponse.push(data.hours2);
//     return res(ctx.json(data.hours2));
//   }),

//   rest.get(
//     BASE + '/api/meal-program/restaurant/meal-program-info',
//     (req, res, ctx) => {
//       return res(ctx.json(data.restaurantInfo2));
//     }
//   ),

//   rest.delete(
//     BASE + '/api/volunteers/hours/:hoursId/:contactId',
//     (req, res, ctx) => {
//       const hours = { ...data.hours2 };
//       hours.status = 'Canceled';
//       getHoursResponse[1] = hours;
//       return res(ctx.json(null));
//     }
//   ),

//   rest.get(BASE + '/api/meal-program/campaign', (req, res, ctx) => {
//     return res(ctx.json({ total: 1000 }));
//   }),
// ];
