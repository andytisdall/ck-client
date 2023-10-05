
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

interface AddPhoneArgs {
  phone: string;
  region: Region
}

export interface GetPhoneNumberResponse {
  number: string;
  id: string;
}

export interface MessageInstance {
  sid: string;
  accountSid: string;
  attributes: string;
  author: string;
  body: string;
  chatServiceSid: string;
  conversationSid: string;
  dateCreated: string;
  dateUpdated: string;
  delivery: any;
}

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

    addPhone: builder.mutation<null, AddPhoneArgs>({
      query: (body) => ({
url: 'text/phone', method: 'POST', body
      })
    }),
    
    getPhoneNumber: builder.query<GetPhoneNumberResponse, string>({
      query: number => ({
        url: '/text/phone/' + number
      })
    }),

    deletePhone: builder.mutation<null, string>({
      query: number => ({
        url: '/text/phone/' + number,
        method: 'DELETE'
      })
    }),

    getScheduledTexts: builder.query<MessageInstance[], void>({
      query: () => ({
        url: '/text/scheduled'
      })
    }),

    deleteScheduledText: builder.mutation<null, string[]>({
      query: (body) => ({
        url: '/text/scheduled/delete', body
      })
    })

  }),
});

export const { useSendTextMutation, useAddPhoneMutation, useLazyGetPhoneNumberQuery, useDeletePhoneMutation, useGetScheduledTextsQuery, useDeleteScheduledTextMutation } = textApi;
