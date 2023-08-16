import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axis, AxisTick, Coordinate2D } from '../types/RadarChartTypes';

const SLICE_NAME = 'chartConfig';

export enum EdgeStyle {
	Solid = 'solid',
	Dashed = 'dashed'
}

type ChartConfigState = {
	axes: Axis[];
  axesEdgesStyle: EdgeStyle;
  outerEdgeStyle: EdgeStyle;
	radialEdgesStyle: EdgeStyle;
  selectedAxis: number;
	startingAngle: number;
};

const initialState: ChartConfigState = {
	axes: initDefaultAxes(),
  axesEdgesStyle: EdgeStyle.Solid,
  outerEdgeStyle: EdgeStyle.Solid,
	radialEdgesStyle: EdgeStyle.Solid,
  selectedAxis: 0,
	startingAngle: 0
};

/*
 ** Selectors
 */
type StateWithChartConfig = {
	[SLICE_NAME]: ChartConfigState;
};

const pickChartConfigState = (state: StateWithChartConfig) => state[SLICE_NAME];

export const selectChartConfig = createSelector([pickChartConfigState], (chartConfig: ChartConfigState) => chartConfig);
export const selectAxes = createSelector([pickChartConfigState], (chartConfig: ChartConfigState) => chartConfig.axes);
export const selectAxisByIndex = createSelector(
	[pickChartConfigState, (_: StateWithChartConfig, index: number) => index],
	(chartConfig: ChartConfigState, index: number) => chartConfig.axes[index]
);
export const selectAxesEdgesStyle = createSelector([pickChartConfigState], (chartConfig: ChartConfigState) => chartConfig.axesEdgesStyle);
export const selectOuterEdgeStyle = createSelector([pickChartConfigState], (chartConfig: ChartConfigState) => chartConfig.outerEdgeStyle);
export const selectRadialEdgesStyle = createSelector([pickChartConfigState], (chartConfig: ChartConfigState) => chartConfig.radialEdgesStyle);
export const selectSelectedAxis = createSelector(
  [pickChartConfigState],
  (chartConfig: ChartConfigState) => {
    return { axis: chartConfig.axes[chartConfig.selectedAxis], index: chartConfig.selectedAxis}
  });


/*
 ** Slice Setup
 */
export const chartConfig = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
    axisLabelChanged: (state: ChartConfigState, action: PayloadAction<{index: number, label: string}>) => {
      state.axes[action.payload.index].label = action.payload.label;
    },
    axisSelected: (state: ChartConfigState, action: PayloadAction<number>) => {
      if (action.payload < state.axes.length) state.selectedAxis = action.payload;
    },
    axisTickLabelChanged: (state: ChartConfigState, action: PayloadAction<{axisIndex: number, tickIndex: number, label: string}>) => {
      state.axes[action.payload.axisIndex].ticks[action.payload.tickIndex].label = action.payload.label;
    },
		incrementAxes: (state: ChartConfigState) => {
			state.axes = JSON.parse(JSON.stringify(state.axes));
			state.axes.push(newAxis(`Axis #${state.axes.length + 1}`, state.axes[0].ticks.length));
		},
		decrementAxes: (state: ChartConfigState) => {
			state.axes = state.axes.slice(0, -1);
		},
		incrementSegments: (state: ChartConfigState) => {
			const updatedAxes = JSON.parse(JSON.stringify(state.axes));

			for (const axis of updatedAxes) {
				axis.ticks = [...axis.ticks, newTick(`Tick #${axis.ticks.length + 1}`)];
			}

			state.axes = updatedAxes;
		},
		decrementSegments: (state: ChartConfigState) => {
			const updatedAxes = JSON.parse(JSON.stringify(state.axes));

			for (const axis of updatedAxes) {
				axis.ticks = axis.ticks.slice(0, -1);
			}

			state.axes = updatedAxes;
		},
    updateAxesEdgesStyle: (state: ChartConfigState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.axesEdgesStyle = action.payload.edgeStyle;
		},
    updateOuterEdgeStyle: (state: ChartConfigState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.outerEdgeStyle = action.payload.edgeStyle;
		},
		updateRadialEdgesStyle: (state: ChartConfigState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.radialEdgesStyle = action.payload.edgeStyle;
		}
	}
});

export const { axisLabelChanged, axisSelected, axisTickLabelChanged, incrementAxes, decrementAxes, incrementSegments, decrementSegments, updateAxesEdgesStyle, updateOuterEdgeStyle, updateRadialEdgesStyle } = chartConfig.actions;

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
