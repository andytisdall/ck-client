import { api } from '../api';

type UploadDocsResponse = {
  title: string;
  docType: string;
};

interface UploadDocsArgs {
  doc: string;
  envelopeId: string;
  email?: string;
}

interface SignDocsArgs {
  doc?: string;
  email?: string;
}

const docusignApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDocusignUrl: builder.query<{ url: string }, SignDocsArgs>({
      query: (body) => {
        let url = '/docusign/sign/' + body.doc;
        if (body.email) {
          url += `/${body.email}`;
        }
        return { url };
      },
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
