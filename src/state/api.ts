import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://portal.ckoakland.org/api"
    : "http://localhost:3001/api";

const baseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const token = localStorage.getItem("ck-token");
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  });
  return baseQuery(args, baseQueryApi, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithToken,
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "UserInfo",
    "Feedback",
    "ScheduledText",
    "AllUsers",
    "HomeChefHours",
    "Recipe",
    "RestaurantInfo",
    "Restaurant",
    "Volunteer",
    "HomeChefShifts",
    "CBOData",
    "PushNotifications",
    "D4JConfig",
    "VolunteerHours",
    "VolunteerShifts",
    "VolunteerCheckInList",
    "DriverInfo",
  ],
});
