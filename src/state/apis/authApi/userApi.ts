import _ from 'lodash'

import {api} from '../../api'
import {User, UsersState, EditUserArgs, ContactInfo, CreateUserArgs} from './types'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
      providesTags: ['User'],
    }),

    getUserInfo: builder.query<ContactInfo, void>({
      query: () => 'user/userInfo',
      providesTags: ['UserInfo']
    }),

    editUser: builder.mutation<null, EditUserArgs>({
      query:body => ({
        url: '/user', body, method: 'PATCH'
      }),
      invalidatesTags: ['User']
    }),

    getAllUsers: builder.query<UsersState, void>({
      query: () => ({
        url: '/user/all'
      }),
      transformResponse: (response: User[]) => _.mapKeys(response, 'id'),
      providesTags: ['AllUsers']
    }),

    createUser: builder.mutation<User, CreateUserArgs>({
      query: body => ({
        url: '/user', body, method: 'POST'
      }),
      invalidatesTags: ['AllUsers', 'User']
    }),

    deleteUser: builder.mutation<null, string>({
      query: userId => ({
        url: '/user/' + userId, method: 'DELETE'
      }),
      invalidatesTags: ['AllUsers']
    })

  })})

  export const { useGetUserQuery, useEditUserMutation, useGetAllUsersQuery, useGetUserInfoQuery, useCreateUserMutation, useDeleteUserMutation} = userApi