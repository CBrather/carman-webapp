import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { chartConfig } from './slices/RadarChartDesign';

const store = configureStore({
	reducer: combineReducers({ chartConfig: chartConfig.reducer })
});

export default store;
