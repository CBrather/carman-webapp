import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SLICE_NAME = 'chartDesign';

export enum EdgeStyle {
	Solid = 'solid',
	Dashed = 'dashed'
}

export type EdgeDesign = {
	color: string;
	style: EdgeStyle;
	thickness: number;
};

export type ChartDesignState = {
	name: string;
	circularEdgesDesign: EdgeDesign;
	outerEdgeDesign: EdgeDesign;
	radialEdgesDesign: EdgeDesign;
	startingAngle: number;
};

const initialState: ChartDesignState = {
	name: 'New Design',
	circularEdgesDesign: {
		color: '#838383',
		style: EdgeStyle.Solid,
		thickness: 1
	},
	radialEdgesDesign: {
		color: '#838383',
		style: EdgeStyle.Solid,
		thickness: 1
	},
	outerEdgeDesign: {
		color: '#838383',
		style: EdgeStyle.Solid,
		thickness: 1
	},
	startingAngle: 0
};

/*
 ** Selectors
 */
type StateWithChartDesign = {
	[SLICE_NAME]: ChartDesignState;
};

const pickChartDesignState = (state: StateWithChartDesign) => state[SLICE_NAME];

export const selectChartDesign = createSelector([pickChartDesignState], (chartDesign: ChartDesignState) => chartDesign);

export const selectName = createSelector([pickChartDesignState], (chartDesign: ChartDesignState) => chartDesign.name);

export const selectRadialEdgesDesign = createSelector(
	[pickChartDesignState],
	(chartDesign: ChartDesignState) => chartDesign.radialEdgesDesign
);
export const selectOuterEdgeDesign = createSelector(
	[pickChartDesignState],
	(chartDesign: ChartDesignState) => chartDesign.outerEdgeDesign
);
export const selectCircularEdgesDesign = createSelector(
	[pickChartDesignState],
	(chartDesign: ChartDesignState) => chartDesign.circularEdgesDesign
);

/*
 ** Slice Setup
 */
export const chartDesign = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		nameChanged: (state: ChartDesignState, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		circularEdgesDesignChanged: (state: ChartDesignState, action: PayloadAction<EdgeDesign>) => {
			state.circularEdgesDesign = action.payload;
		},
		outerEdgeDesignChanged: (state: ChartDesignState, action: PayloadAction<EdgeDesign>) => {
			state.outerEdgeDesign = action.payload;
		},
		radialEdgesDesignChanged: (state: ChartDesignState, action: PayloadAction<EdgeDesign>) => {
			state.radialEdgesDesign = action.payload;
		}
	}
});

export const { nameChanged, circularEdgesDesignChanged, outerEdgeDesignChanged, radialEdgesDesignChanged } =
	chartDesign.actions;
