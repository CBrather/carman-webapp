import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { chartDesign, SLICE_NAME as CHART_DESIGN_SLICE_NAME } from './slices/RadarChartDesign';
import { dataSet, SLICE_NAME as DATA_SET_SLICE_NAME } from './slices/DataSet';

const store = configureStore({
	reducer: combineReducers({
		[CHART_DESIGN_SLICE_NAME]: chartDesign.reducer,
		[DATA_SET_SLICE_NAME]: dataSet.reducer
	})
});

export default store;
