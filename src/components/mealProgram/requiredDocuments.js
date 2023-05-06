export const uploadDocuments = [
  { name: 'Copy of Current Business License', data: 'BL' },
  { name: 'Insurance', data: 'IN' },
  { name: 'Copy of Current Health Department Permit', data: 'HD' },
];

export const signDocuments = [
  { name: 'W9', data: 'W9' },
  { name: 'Restaurant Contract', data: 'RC' },
  { name: 'Direct Deposit Form', data: 'DD' },
];

export const requiredDocuments = [...uploadDocuments, ...signDocuments];
