import { ConfigProvider, theme } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { lime } from '@ant-design/colors';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App.tsx';
import './index.css';
import { GetEnvironmentConfig } from './services/Environment.ts';
import store from './store/store.ts';

const { clientID, domain } = GetEnvironmentConfig().auth;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: lime.primary } }}>
			<React.StrictMode>
				<Auth0Provider
					domain={domain}
					clientId={clientID}
					authorizationParams={{
						redirect_uri: window.location.origin
					}}
				>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Auth0Provider>
			</React.StrictMode>
		</ConfigProvider>
	</Provider>
);
