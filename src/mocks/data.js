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
  id: j.Id,
  name: j.Name,
  shifts: [],
  active: !j.GW_Volunteers__Inactive__c,
  location: decode(
    j.GW_Volunteers__Location_Information__c?.replace(/<p>/g, '')
      .replace(/<\/p>/g, '')
      .replace(/<br>/g, '')
  ),
}

const shift1 = {
  return {
    id: js.Id,
    startTime: js.GW_Volunteers__Start_Date_Time__c,
    open: js.GW_Volunteers__Number_of_Volunteers_Still_Needed__c > 0,
    job: j.id,
  };
}