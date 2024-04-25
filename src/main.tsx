import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/GlobalStyle';
import App from './App.tsx';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
);
