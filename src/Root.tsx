import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PropsWithChildren } from 'react';

import { store } from './state/store';

const clientId =
  '385802469502-061cv1crj954fcp56kthk40u918eu1ot.apps.googleusercontent.com';

const Root = ({ children }: PropsWithChildren) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  );
};

export default Root;
