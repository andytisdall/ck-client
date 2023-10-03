import { api } from '../api';

type Region = 'WEST_OAKLAND' | 'EAST_OAKLAND';
type SendTextBody = {
  message: string;
  region: Region;
  photo?: string | File;
  feedbackId?: string;
  number?: string;
};
type SendTextResponse = {
  message: string;
  region: Region;
  photoUrl?: string;
  number: string;
};

export const textApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendText: builder.mutation<SendTextResponse, SendTextBody>({
      query: ({ message, region, photo, feedbackId, number }) => {
        const postBody = new FormData();
        postBody.append('message', message);
        postBody.append('region', region);
        if (photo) {
          postBody.append('photo', photo);
        }
        if (feedbackId) {
          postBody.append('feedbackId', feedbackId);
        }
        if (number) {
          postBody.append('number', number);
        }

        return {
          url: 'text/outgoing',
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          postBody,
        };
      },
    }),
  }),
});

export const { useSendTextMutation } = textApi;
