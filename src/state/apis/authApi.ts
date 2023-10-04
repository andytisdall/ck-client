import { api } from '../api';

interface User {
  username: string;
  admin: boolean;
  active: boolean;
  salesforceId: string;
}
interface SignInArgs {
  username: string;
  password: string;
}
interface SignInResponse {
  user: User;
  token: string;
}
interface ContactInfo {
  firstName: string;
  lastName: string;
  volunteerAgreement: boolean;
  foodHandler: boolean;
  homeChefStatus: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
      providesTags: ['User'],
    }),

    signIn: builder.mutation<User, SignInArgs>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
      transformResponse: async (response: SignInResponse) => {
        localStorage.setItem('ck-token', response.token);
        return response.user;
      },
      invalidatesTags: (result) => {
        if (result) {
          return ['User'];
        } else {
          return [];
        }
      },
    }),

    signOut: builder.mutation<null, void>({
      invalidatesTags: () => ['User'],
      queryFn: () => {
        localStorage.removeItem('ck-token');
        return { data: null };
      },
    }),

    getUserInfo: builder.query<ContactInfo, void>({
      query: () => 'user/userInfo',
      providesTags: ['UserInfo']
    }),
  }),
});

export const {
  useGetUserQuery,
  useSignInMutation,
  useSignOutMutation,
  useGetUserInfoQuery,
} = authApi;
