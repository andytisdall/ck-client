import _ from 'lodash';

import { api } from '../../api';
import {
  User,
  UsersState,
  EditUserArgs,
  ContactInfo,
  CreateUserArgs,
} from './types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User | null, void>({
      query: () => 'user',
      providesTags: ['User'],
    }),

    getUserInfo: builder.query<ContactInfo, void>({
      query: () => 'user/userInfo',
      providesTags: ['UserInfo'],
    }),

    editUser: builder.mutation<null, EditUserArgs>({
      query: (body) => ({
        url: '/user',
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['User', 'UserInfo'],
    }),

    getAllUsers: builder.query<UsersState, void>({
      query: () => ({
        url: '/user/all',
      }),
      transformResponse: (response: User[]) => _.mapKeys(response, 'id'),
      providesTags: ['AllUsers'],
    }),

    createUser: builder.mutation<User, CreateUserArgs>({
      query: (body) => ({
        url: '/user',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['AllUsers', 'User'],
    }),

    deleteUser: builder.mutation<null, string>({
      query: (userId) => ({
        url: '/user/' + userId,
        method: 'DELETE',
      }),
      invalidatesTags: ['AllUsers'],
    }),

    connectGoogle: builder.mutation<null, string>({
      query: (credential) => ({
        url: '/user/connect-google',
        body: { credential },
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation<null, string>({
      query: (email) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<null, { token: string; password: string }>({
      query: (body) => ({
        url: '/user/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useEditUserMutation,
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useConnectGoogleMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = userApi;
