import { api } from '../api';

export type ZipCode =
  | '94501'
  | '94502'
  | '94536'
  | '94537'
  | '94538'
  | '94539'
  | '94540'
  | '94541'
  | '94542'
  | '94543'
  | '94544'
  | '94545'
  | '94546'
  | '94550'
  | '94551'
  | '94552'
  | '94555'
  | '94557'
  | '94560'
  | '94566'
  | '94568'
  | '94577'
  | '94578'
  | '94579'
  | '94580'
  | '94586'
  | '94587'
  | '94588'
  | '94601'
  | '94602'
  | '94603'
  | '94604'
  | '94605'
  | '94606'
  | '94607'
  | '94608'
  | '94609'
  | '94610'
  | '94611'
  | '94612'
  | '94613'
  | '94614'
  | '94615'
  | '94616'
  | '94617'
  | '94618'
  | '94619'
  | '94620'
  | '94621'
  | '94623'
  | '94624'
  | '94661'
  | '94662'
  | '94701'
  | '94702'
  | '94703'
  | '94704'
  | '94705'
  | '94706'
  | '94707'
  | '94708'
  | '94709'
  | '94710'
  | '94712'
  | 'DeclinetoState'
  | 'Unhoused'
  | 'Other';

export interface Age {
  age17: number;
  age26: number;
  age49: number;
  age60: number;
  ageOver60: number;
  ageUnknown: number;
}

export interface Race {
  raceAfrican: number;
  raceLatin: number;
  raceAsian: number;
  raceNativeAmerican: number;
  raceWhite: number;
  raceDecline: number;
  raceUnknown: number;
  raceOther: number;
  raceOtherText: number;
  raceMixed: number;
  raceMixedText: number;
}

export interface PerformanceMeasures {
  percentWOAccess: number;
  mealsProvided: number;
  unusable: number;
  postcards: number;
  calfreshApps: number;
  SSA: number;
}

export interface CBOReport {
  month: string;
  year: string;
  name: string;
  performanceMeasures: PerformanceMeasures;
  age: Age;
  race: Race;
  households: number;
  zips: Record<ZipCode, number | undefined>;
  feedback: string;
  phoneNumber: string;
  email: string;
  cboId: string;
}

const cboApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCBOReports: builder.query<CBOReport[], void>({
      query: () => 'meal-program/cbo/reports',
      providesTags: ['CBOData'],
    }),
  }),
});

export const { useGetCBOReportsQuery } = cboApi;
