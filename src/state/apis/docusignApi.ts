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
    getDocusignUrl: builder.query<{ url: string }, string | undefined>({
      query: (doc) => ({
        url: '/docusign/sign/' + doc,
      }),
    }),
    uploadSignedDocsToSalesforce: builder.mutation<
      UploadDocsResponse[],
      UploadDocsArgs
    >({
      query: (body) => ({ url: '/docusign/getDoc', body, method: 'POST' }),
      invalidatesTags: ['UserInfo', 'RestaurantInfo'],
    }),
  }),
});

export const {
  useGetDocusignUrlQuery,
  useUploadSignedDocsToSalesforceMutation,
} = docusignApi;
