import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axis, AxisTick, Coordinate2D } from '../types/RadarChartTypes';

const SLICE_NAME = 'chartConfig';

export enum EdgeStyle {
	Solid = 'solid',
	Dashed = 'dashed'
}

type ChartConfigState = {
	axes: Axis[];
	radialEdgesStyle: EdgeStyle;
  selectedAxis: number;
	startingAngle: number;
};

const initialState: ChartConfigState = {
	axes: initDefaultAxes(),
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
    axisSelected: (state: ChartConfigState, action: PayloadAction<number>) => {
      if (action.payload < state.axes.length) state.selectedAxis = action.payload;
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
		updateAxis: (state: ChartConfigState, action: PayloadAction<{ index: number; axis: Axis }>) => {
			state.axes[action.payload.index] = action.payload.axis;
		},
		updateRadialEdgesStyle: (state: ChartConfigState, action: PayloadAction<{ edgeStyle: EdgeStyle }>) => {
			state.radialEdgesStyle = action.payload.edgeStyle;
		}
	}
});

export const { axisSelected, incrementAxes, decrementAxes, incrementSegments, decrementSegments, updateAxis, updateRadialEdgesStyle } = chartConfig.actions;

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
