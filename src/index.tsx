import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Root from './root';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import reportWebVitals from './reportWebVitals';
// import { clientId } from './root';
import { store } from './state/store';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="root"></div';

const root = createRoot(document.getElementById('root')!);
root.render(
  // <GoogleOAuthProvider clientId={clientId}>
  <Provider store={store}>
    <App />
  </Provider>
  // </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();