import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './state/store';
import { createRoot } from 'react-dom/client';

const clientId =
  '385802469502-061cv1crj954fcp56kthk40u918eu1ot.apps.googleusercontent.com';

document.body.innerHTML = '<div id="root"></div';

const root = createRoot(document.getElementById('root')!);
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
