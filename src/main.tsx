import React from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigProvider, theme } from 'antd'

import { Provider } from 'react-redux';
import store from './store/store.ts';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConfigProvider>
	</Provider>
);
