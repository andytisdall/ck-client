import { api } from '../api';
import { NotificationArgs } from './volunteerApi';

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
    sendD4JNotification: builder.mutation<null, NotificationArgs>({
      query: (body) => ({
        url: '/d4j/notifications',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const { useUploadReceiptMutation, useSendD4JNotificationMutation } =
  d4jApi;
