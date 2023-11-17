import { api } from '../api';

interface UploadReceiptArgs {
  receipt: File;
  id: string;
}

const d4jApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadReceipt: builder.mutation<null, UploadReceiptArgs>({
      query: ({ receipt, id }) => {
        const body = new FormData();
        body.append('receipt', receipt);
        body.append('id', id);
        return { url: '/d4j/receipt', method: 'POST', body, formData: true };
      },
    }),
  }),
});

export const { useUploadReceiptMutation } = d4jApi;
