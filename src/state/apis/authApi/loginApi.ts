import { api } from "../../api";
import { User, SignInResponse, SignInArgs } from "./types";

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<User, SignInArgs>({
      query: (body) => ({
        url: "/signin",
        method: "POST",
        body,
      }),
      transformResponse: async (response: SignInResponse) => {
        localStorage.setItem("ck-token", response.token);
        return response.user;
      },
      invalidatesTags: [
        "User",
        "UserInfo",
        "Volunteer",
        "Restaurant",
        "CBOData",
        "DriverInfo",
      ],
    }),

    signOut: builder.mutation<null, void>({
      queryFn: () => {
        localStorage.removeItem("ck-token");
        api.util.resetApiState();
        return { data: null };
      },
      invalidatesTags: ["User", "UserInfo", "DriverInfo"],
    }),

    googleSignIn: builder.mutation<User, string>({
      query: (credential) => ({
        url: "/google-signin",
        method: "POST",
        body: { credential },
      }),
      transformResponse: async (response: SignInResponse) => {
        localStorage.setItem("ck-token", response.token);
        return response.user;
      },
      invalidatesTags: ["User", "UserInfo", "DriverInfo"],
    }),

    signInAsUser: builder.mutation<User, string>({
      query: (userId) => ({
        body: { userId },
        method: "POST",
        url: "/admin-signin",
      }),
      transformResponse: async (response: SignInResponse) => {
        localStorage.setItem("ck-token", response.token);
        return response.user;
      },
      invalidatesTags: [
        "User",
        "UserInfo",
        "Volunteer",
        "Restaurant",
        "CBOData",
        "DriverInfo",
      ],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,
  useGoogleSignInMutation,
  useSignInAsUserMutation,
} = loginApi;
