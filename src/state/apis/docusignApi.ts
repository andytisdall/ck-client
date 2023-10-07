import { api } from '../api';

type UploadDocsResponse = {
  title: string;
  docType: string;
};

interface UploadDocsArgs {
  doc: string;
  envelopeId: string;
}

const docusignApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDocusignUrl: builder.query<null, string | undefined>({
      query: (doc) => ({
        url: '/docusign/sign',
        method: 'POST',
        params: {
          doc,
        },
      }),
    }),
    uploadDocsToSalesforce: builder.mutation<
      UploadDocsResponse[],
      UploadDocsArgs
    >({
      query: (body) => ({ url: '/docusign/getDoc', body, method: 'POST' }),
      invalidatesTags: ['UserInfo'],
    }),
  }),
});

export const { useGetDocusignUrlQuery, useUploadDocsToSalesforceMutation } =
  docusignApi;
