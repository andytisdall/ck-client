import { api } from '../api';

export type Region = 'WEST_OAKLAND' | 'EAST_OAKLAND';
type SendTextBody = {
  message: string;
  region: Region;
  photo?: string | File;
  feedbackId?: string;
  number?: string;
};
export type SendTextResponse = {
  message: string;
  region: Region;
  photoUrl?: string;
  number: string;
  sendAt?: string;
};

export const textApi = api.injectEndpoints({
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
          url: 'text/outgoing',
          method: 'POST',
          body: postBody,
          formData: true,
        };
      },
    }),
  }),
});

export const { useSendTextMutation } = textApi;
