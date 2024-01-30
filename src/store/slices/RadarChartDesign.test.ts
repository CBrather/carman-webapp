import { describe, expect, it } from 'vitest';

import { configureStore } from '@reduxjs/toolkit';

import { EdgeStyle, chartDesign } from './RadarChartDesign';

describe('Slice: RadarChartConfig', () => {
	it('initializes with empty user non-authorized user', () => {
		const store = configureStore({
			reducer: chartDesign.reducer
		});

		const expectedEdgeDesign = {
			color: '#838383',
			style: EdgeStyle.Solid,
			thickness: 1
		};

		const defaultState = store.getState();
		expect(defaultState.circularEdgesDesign).toStrictEqual(expectedEdgeDesign);
		expect(defaultState.radialEdgesDesign).toStrictEqual(expectedEdgeDesign);
		expect(defaultState.outerEdgeDesign).toStrictEqual(expectedEdgeDesign);
	});
});
