import { api } from "../../api";

export type CarSize = "Small" | "Medium" | "Large" | "Bike";

export interface DriverInfo {
  firstName?: string;
  lastName: string;
  licenseExpiration?: string;
  insuranceExpiration?: string;
  volunteerAgreement: boolean;
  car?: CarSize;
  driverStatus?: "Active" | "Inactive";
}

interface CarInfo {
  size: CarSize;
}

interface DriverShift {
  id: string;
  startTime: string;
  open: boolean;
  job: string;
  duration: number;
  origin: string;
  destination: string;
  distance: string;
}

const driverApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query<DriverInfo | null, void>({
      query: () => "/volunteers/driver",
      providesTags: ["DriverInfo"],
    }),
    uploadLicense: builder.mutation<null, FormData>({
      query: (body) => {
        return {
          url: "/volunteers/driver/license",
          body,
          formData: true,
          method: "POST",
        };
      },
      invalidatesTags: ["DriverInfo"],
    }),
    submitCarInfo: builder.mutation<null, CarInfo>({
      query: (body) => ({
        method: "POST",
        body,
        url: "/volunteers/driver/car",
      }),
      invalidatesTags: ["DriverInfo"],
    }),
    getCars: builder.query<Record<string, string>[], void>({
      query: () => "/volunteers/driver/cars",
    }),
    getDirections: builder.query<
      { distance: string },
      { origin: string; destination: string }
    >({
      query: ({ origin, destination }) =>
        `/volunteers/driver/directions/${origin}/${destination}`,
    }),
    getDriverShifts: builder.query<DriverShift[], void>({
      query: () => "/volunteers/driver/shifts",
    }),
  }),
});

export const optimisticallyUpdateDriverStatus = driverApi.util.updateQueryData(
  "getDriver",
  undefined,
  (driverInfo) => {
    if (!driverInfo) {
      return null;
    }
    const newUserInfo = {
      ...driverInfo,
      volunteerAgreement: true,
    };

    if (
      driverInfo.car &&
      driverInfo.licenseExpiration &&
      driverInfo.insuranceExpiration &&
      new Date(driverInfo.licenseExpiration) > new Date() &&
      new Date(driverInfo.insuranceExpiration) > new Date()
    ) {
      newUserInfo.driverStatus = "Active";
    }

    return newUserInfo;
  }
);

export const {
  useGetDriverQuery,
  useUploadLicenseMutation,
  useSubmitCarInfoMutation,
  useGetCarsQuery,
  useLazyGetDirectionsQuery,
  useGetDriverShiftsQuery,
} = driverApi;
