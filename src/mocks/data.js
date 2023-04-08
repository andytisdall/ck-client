import moment from 'moment';

export const user1 = {
  username: 'bojee',
  id: 'failjrse48jf48',
  admin: false,
  salesforceId: 'f4s9jf4s9j',
  active: true,
};

export const userInfo1 = {
  firstName: 'Testy',
  lastName: 'Testorici',
  volunteerAgreement: true,
  foodHandler: true,
  homeChefStatus: 'Active',
};

export const userInfo2 = {
  firstName: 'Testy',
  lastName: 'Testorici',
  volunteerAgreement: false,
  foodHandler: true,
  homeChefStatus: 'Attended Orientation',
};

export const restaurant1 = {
  name: "Guigino's",
  id: 'hi7h7gh7gh',
  salesforceId: 'khi8h',
  remainingDocs: [],
  completedDocs: [],
};

export const campaign = {
  mealsDonated: 100,
};

const job1 = {
  id: '7777',
  name: 'City Slicker Farms',
  shifts: ['1111'],
  active: true,
  location: 'Location',
};

const shift1 = {
  id: job1.shifts[0],
  startTime: moment().add(1, 'day').format(),
  open: true,
  job: job1.id,
};

export const hours1 = {
  id: 'd38ih3d',
  mealCount: '25',
  time: shift1.startTime,
  job: job1.id,
  status: 'Confirmed',
  shift: shift1.id,
};

export const jobs = { jobs: [job1], shifts: [shift1] };
