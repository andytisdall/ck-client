import { api } from "../../api";

export type CarSize = "Small" | "Medium" | "Large" | "Bike";

export interface DriverInfo {
  licenseExpiration?: string;
  insuranceExpiration?: string;
  volunteerAgreement: boolean;
  car: CarInfo;
  driverStatus?: "Active" | "Inactive";
}

interface CarInfo {
  size?: CarSize;
  make?: string;
  model?: string;
  year?: string;
  color?: string;
}

export interface UploadDocArgs {
  file: File;
  date: string;
}

const driverApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query<DriverInfo | null, void>({
      query: () => "/volunteers/driver",
      providesTags: ["DriverInfo"],
    }),
    uploadLicense: builder.mutation<null, UploadDocArgs>({
      query: ({ file, date }) => {
        const body = new FormData();
        body.append("DL", file);
        body.append("expirationDate", date);
        return {
          url: "/volunteers/driver/license",
          body,
          formData: true,
          method: "POST",
        };
      },
      invalidatesTags: ["DriverInfo"],
    }),
    uploadInsurance: builder.mutation<null, UploadDocArgs>({
      query: ({ file, date }) => {
        const body = new FormData();
        body.append("INS", file);
        body.append("expirationDate", date);
        return {
          url: "/volunteers/driver/insurance",
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
  useUploadInsuranceMutation,
} = driverApi;
