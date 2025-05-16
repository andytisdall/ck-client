import { api } from "../../api";

export type CarSize = "Small" | "Medium" | "Large" | "Bike";

interface DriverInfo {
  firstName?: string;
  lastName: string;
  licenseExpiration?: string;
  volunteerAgreement: boolean;
  car?: CarSize;
  driverStatus?: "Active" | "Inactive";
}

interface CarInfo {
  size: CarSize;
}

const driverApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query<DriverInfo, void>({
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
  }),
});

export const optimisticallyUpdateDriverStatus = driverApi.util.updateQueryData(
  "getDriver",
  undefined,
  (driverInfo) => {
    const newUserInfo = {
      ...driverInfo,
      volunteerAgreement: true,
    };

    if (
      driverInfo.car &&
      driverInfo.licenseExpiration &&
      new Date(driverInfo.licenseExpiration) > new Date()
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
} = driverApi;
