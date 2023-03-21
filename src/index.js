import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Root from './root';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import reportWebVitals from './reportWebVitals';

const clientId =
  '385802469502-061cv1crj954fcp56kthk40u918eu1ot.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Root initialState={{}}>
      <App />
    </Root>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
