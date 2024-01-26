import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { chartDesign, SLICE_NAME as CHART_DESIGN_SLICE_NAME } from './slices/RadarChartDesign';
import { dataSet, SLICE_NAME as DATA_SET_SLICE_NAME } from './slices/DataSet';
import { api } from '../api/api.gen';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { GetEnvironmentConfig } from '../services/Environment';

const { audience, clientID, domain } = GetEnvironmentConfig().auth;

const store = configureStore({
	reducer: combineReducers({
		[CHART_DESIGN_SLICE_NAME]: chartDesign.reducer,
		[DATA_SET_SLICE_NAME]: dataSet.reducer
	}),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: {
					authClient: new Auth0Client({ domain, clientId: clientID, authorizationParams: { audience } })
				}
			}
		}).concat(api.middleware)
});

export default store;
