import { api } from '../api';

interface UploadFilesResponse {
  title: string;
  description: string;
  folder: string;
  docType: string;
}

interface UploadFilesArgs {
  formData: FormData;
  accountType: 'contact' | 'account';
  expiration?: Date;
}

const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadFilesResponse, UploadFilesArgs>({
      query: ({ formData, accountType, expiration }) => {
        if (expiration) {
          formData.append('expiration', expiration.toString());
        }
        formData.append('accountType', accountType);
        return { url: '/files', body: formData, formData: true };
      },
    }),
  }),
});
export const { useUploadFilesMutation } = fileApi;
