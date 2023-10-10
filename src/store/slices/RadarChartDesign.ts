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
	circularEdgesDesign: EdgeDesign;
	outerEdgeDesign: EdgeDesign;
	radialEdgesDesign: EdgeDesign;
	startingAngle: number;
};

const initialState: ChartDesignState = {
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
		circularEdgesColorChanged: (state: ChartDesignState, action: PayloadAction<{ color: string }>) => {
			state.circularEdgesDesign.color = action.payload.color;
		},
		circularEdgesStyleChanged: (state: ChartDesignState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.circularEdgesDesign.style = action.payload.edgeStyle;
		},
		circularEdgesThicknessChanged: (state: ChartDesignState, action: PayloadAction<{ thickness: number }>) => {
			if (action.payload.thickness < 1) return;
			state.circularEdgesDesign.thickness = action.payload.thickness;
		},
		outerEdgeColorChanged: (state: ChartDesignState, action: PayloadAction<{ color: string }>) => {
			state.outerEdgeDesign.color = action.payload.color;
		},
		outerEdgeStyleChanged: (state: ChartDesignState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.outerEdgeDesign.style = action.payload.edgeStyle;
		},
		outerEdgeThicknessChanged: (state: ChartDesignState, action: PayloadAction<{ thickness: number }>) => {
			if (action.payload.thickness < 1) return;
			state.outerEdgeDesign.thickness = action.payload.thickness;
		},
		radialEdgesColorChanged: (state: ChartDesignState, action: PayloadAction<{ color: string }>) => {
			state.radialEdgesDesign.color = action.payload.color;
		},
		radialEdgesStyleChanged: (state: ChartDesignState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.radialEdgesDesign.style = action.payload.edgeStyle;
		},
		radialEdgesThicknessChanged: (state: ChartDesignState, action: PayloadAction<{ thickness: number }>) => {
			if (action.payload.thickness < 1) return;
			state.radialEdgesDesign.thickness = action.payload.thickness;
		}
	}
});

export const {
	circularEdgesColorChanged,
	circularEdgesStyleChanged,
	circularEdgesThicknessChanged,
	outerEdgeColorChanged,
	outerEdgeStyleChanged,
	outerEdgeThicknessChanged,
	radialEdgesColorChanged,
	radialEdgesStyleChanged,
	radialEdgesThicknessChanged
} = chartDesign.actions;
