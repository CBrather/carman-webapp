import { configureStore } from '@reduxjs/toolkit';
import { expect, it, describe } from 'vitest';
import { chartConfig } from './RadarChartConfig';

describe('Slice: RadarChartConfig', () => {
	it('initializes with empty user non-authorized user', () => {
		const store = configureStore({
			reducer: chartConfig.reducer
		});

		const defaultState = store.getState();
		expect(defaultState.selectedAxis).toBe(0);
	});
});
