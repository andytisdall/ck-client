
import { api } from '../../api';
import {User, SignInResponse, SignInArgs} from './types'


export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({

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

    
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,

} = loginApi;
