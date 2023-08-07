import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { chartConfig } from './slices/RadarChartConfig';

const store = configureStore({
	reducer: combineReducers({ chartConfig: chartConfig.reducer })
});

export default store;
