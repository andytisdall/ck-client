import { api } from '../../api';
import { SendTextResponse, SendTextBody } from './types';

export const sendTextApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendText: builder.mutation<SendTextResponse, SendTextBody>({
      query: (body) => {
        const postBody = new FormData();
        postBody.append('message', body.message);
        postBody.append('region', body.region);
        if (body.photo) {
          postBody.append('photo', body.photo);
        }
        if (body.feedbackId) {
          postBody.append('feedbackId', body.feedbackId);
        }
        if (body.number) {
          postBody.append('number', body.number);
        }
        return {
          url: '/text/outgoing',
          method: 'POST',
          body: postBody,
          formData: true,
        };
      },
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const { useSendTextMutation } = sendTextApi;
