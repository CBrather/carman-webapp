import React from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigProvider, theme } from 'antd'
import { volcano } from '@ant-design/colors'

import { Provider } from 'react-redux';
import store from './store/store.ts';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm, token: { colorPrimary: volcano.primary}}}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ConfigProvider>
	</Provider>
);
