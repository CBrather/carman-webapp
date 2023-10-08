import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axis, AxisTick, Coordinate2D } from '../types/RadarChartTypes';

const SLICE_NAME = 'chartConfig';

export enum EdgeStyle {
	Solid = 'solid',
	Dashed = 'dashed'
}

type ChartDesignState = {
	axes: Axis[];
	axesColor: string;
	axesEdgesStyle: EdgeStyle;
	axesThickness: number;
	outerEdgeColor: string;
	outerEdgeStyle: EdgeStyle;
	outerEdgeThickness: number;
	radialEdgesColor: string;
	radialEdgesStyle: EdgeStyle;
	radialEdgesThickness: number;
	selectedAxis: number;
	startingAngle: number;
};

const initialState: ChartDesignState = {
	axes: initDefaultAxes(),
	axesColor: '#838383',
	axesEdgesStyle: EdgeStyle.Solid,
	axesThickness: 1,
	outerEdgeColor: '#838383',
	outerEdgeStyle: EdgeStyle.Solid,
	outerEdgeThickness: 1,
	radialEdgesColor: '#838383',
	radialEdgesStyle: EdgeStyle.Solid,
	radialEdgesThickness: 1,
	selectedAxis: 0,
	startingAngle: 0
};

/*
 ** Selectors
 */
type StateWithChartConfig = {
	[SLICE_NAME]: ChartDesignState;
};

const pickChartDesignState = (state: StateWithChartConfig) => state[SLICE_NAME];

export const selectChartConfig = createSelector([pickChartDesignState], (chartConfig: ChartDesignState) => chartConfig);
export const selectAxes = createSelector([pickChartDesignState], (chartConfig: ChartDesignState) => chartConfig.axes);
export const selectAxisByIndex = createSelector(
	[pickChartDesignState, (_: StateWithChartConfig, index: number) => index],
	(chartConfig: ChartDesignState, index: number) => chartConfig.axes[index]
);
export const selectAxesEdgesStyle = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.axesEdgesStyle
);
export const selectOuterEdgeStyle = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.outerEdgeStyle
);
export const selectRadialEdgesStyle = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.radialEdgesStyle
);
export const selectAxesColor = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.axesColor
);
export const selectOuterEdgeColor = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.outerEdgeColor
);
export const selectRadialEdgesColor = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.radialEdgesColor
);
export const selectAxesThickness = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.axesThickness
);
export const selectOuterEdgeThickness = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.outerEdgeThickness
);
export const selectRadialEdgesThickness = createSelector(
	[pickChartDesignState],
	(chartConfig: ChartDesignState) => chartConfig.radialEdgesThickness
);
export const selectSelectedAxis = createSelector([pickChartDesignState], (chartConfig: ChartDesignState) => {
	return { axis: chartConfig.axes[chartConfig.selectedAxis], index: chartConfig.selectedAxis };
});

/*
 ** Slice Setup
 */
export const chartConfig = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		axisLabelChanged: (state: ChartDesignState, action: PayloadAction<{ index: number; label: string }>) => {
			state.axes[action.payload.index].label = action.payload.label;
		},
		axisSelected: (state: ChartDesignState, action: PayloadAction<number>) => {
			if (action.payload < state.axes.length) state.selectedAxis = action.payload;
		},
		axisTickLabelChanged: (
			state: ChartDesignState,
			action: PayloadAction<{ axisIndex: number; tickIndex: number; label: string }>
		) => {
			state.axes[action.payload.axisIndex].ticks[action.payload.tickIndex].label = action.payload.label;
		},
		incrementAxes: (state: ChartDesignState) => {
			state.axes = JSON.parse(JSON.stringify(state.axes));
			state.axes.push(newAxis(`Axis #${state.axes.length + 1}`, state.axes[0].ticks.length));
		},
		decrementAxes: (state: ChartDesignState) => {
			state.axes = state.axes.slice(0, -1);
		},
		incrementSegments: (state: ChartDesignState) => {
			const updatedAxes = JSON.parse(JSON.stringify(state.axes));

			for (const axis of updatedAxes) {
				axis.ticks = [...axis.ticks, newTick(`Tick #${axis.ticks.length + 1}`)];
			}

			state.axes = updatedAxes;
		},
		decrementSegments: (state: ChartDesignState) => {
			const updatedAxes = JSON.parse(JSON.stringify(state.axes));

			for (const axis of updatedAxes) {
				axis.ticks = axis.ticks.slice(0, -1);
			}

			state.axes = updatedAxes;
		},
		updateAxesEdgesStyle: (state: ChartDesignState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.axesEdgesStyle = action.payload.edgeStyle;
		},
		updateOuterEdgeStyle: (state: ChartDesignState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.outerEdgeStyle = action.payload.edgeStyle;
		},
		updateRadialEdgesStyle: (state: ChartDesignState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.radialEdgesStyle = action.payload.edgeStyle;
		},
		updateAxesColor: (state: ChartDesignState, action: PayloadAction<{ color: string }>) => {
			state.axesColor = action.payload.color;
		},
		updateOuterEdgeColor: (state: ChartDesignState, action: PayloadAction<{ color: string }>) => {
			state.outerEdgeColor = action.payload.color;
		},
		updateRadialEdgesColor: (state: ChartDesignState, action: PayloadAction<{ color: string }>) => {
			state.radialEdgesColor = action.payload.color;
		},
		updateAxesThickness: (state: ChartDesignState, action: PayloadAction<{ thickness: number }>) => {
			if (action.payload.thickness < 1) return;
			state.axesThickness = action.payload.thickness;
		},
		updateOuterEdgeThickness: (state: ChartDesignState, action: PayloadAction<{ thickness: number }>) => {
			if (action.payload.thickness < 1) return;
			state.outerEdgeThickness = action.payload.thickness;
		},
		updateRadialEdgesThickness: (state: ChartDesignState, action: PayloadAction<{ thickness: number }>) => {
			if (action.payload.thickness < 1) return;
			state.radialEdgesThickness = action.payload.thickness;
		}
	}
});

export const {
	axisLabelChanged,
	axisSelected,
	axisTickLabelChanged,
	incrementAxes,
	decrementAxes,
	incrementSegments,
	decrementSegments,
	updateAxesEdgesStyle,
	updateOuterEdgeStyle,
	updateRadialEdgesStyle,
	updateAxesColor,
	updateOuterEdgeColor,
	updateRadialEdgesColor,
	updateAxesThickness,
	updateOuterEdgeThickness,
	updateRadialEdgesThickness
} = chartConfig.actions;

/*
 ** Helper
 */
function initDefaultAxes(): Axis[] {
	const defaultAxes: Axis[] = [];

	for (let i = 0; i < 5; i++) {
		defaultAxes.push(newAxis(`Axis #${i + 1}`, 5));
	}

	return defaultAxes;
}

function newAxis(label: string, amountSegments: number = 5): Axis {
	const axis: Axis = {
		label,
		ticks: []
	};

	for (let i = 0; i < amountSegments; i++) {
		axis.ticks.push(newTick(`Tick #${i + 1}`));
	}

	return axis;
}

function newTick(label: string, location: Coordinate2D = { x: 0, y: 0 }): AxisTick {
	const tick: AxisTick = {
		label,
		location
	};

	return tick;
}
