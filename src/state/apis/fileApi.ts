import { api } from '../api';

export interface UploadFilesResponse {
  title: string;
  description: string;
  folder: string;
  docType: string;
}

interface UploadFilesArgs {
  formData: FormData;
  accountType: 'contact' | 'restaurant';
  expiration?: string;
}

const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadFilesResponse[], UploadFilesArgs>({
      query: ({ formData, accountType, expiration }) => {
        if (expiration) {
          formData.append('expiration', expiration);
        }
        formData.append('accountType', accountType);
        return {
          url: '/files',
          body: formData,
          formData: true,
          method: 'POST',
        };
      },
      invalidatesTags: ['RestaurantInfo', 'UserInfo'],
    }),
  }),
});
export const { useUploadFilesMutation } = fileApi;
