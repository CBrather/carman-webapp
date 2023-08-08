import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axis, AxisTick, Coordinate2D } from '../types/RadarChartTypes';

const SLICE_NAME = 'chartConfig';

type ChartConfigState = {
	startingAngle: number;
	axes: Axis[];
};

const initialState: ChartConfigState = {
	startingAngle: 0,
	axes: initDefaultAxes()
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

/*
 ** Slice Setup
 */
export const chartConfig = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		incrementAxes: (state: ChartConfigState) => {
			state.axes = JSON.parse(JSON.stringify(state.axes));
			state.axes.push(newAxis(`Axis #${state.axes.length+1}`, state.axes[0].ticks.length));
		},
		decrementAxes: (state: ChartConfigState) => {
			state.axes = state.axes.slice(0, -1);
		},
		incrementSegments: (state: ChartConfigState) => {
			const updatedAxes = JSON.parse(JSON.stringify(state.axes));

			for (const axis of updatedAxes) {
				axis.ticks = [...axis.ticks, newTick(`Tick #${axis.ticks.length+1}`)];
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
		}
	}
});

export const { incrementAxes, decrementAxes, incrementSegments, decrementSegments, updateAxis } = chartConfig.actions;

/*
 ** Helper
 */
function initDefaultAxes(): Axis[] {
	const defaultAxes: Axis[] = [];

	for (let i = 0; i < 5; i++) {
		defaultAxes.push(newAxis(`Axis #${i+1}`, 5));
	}

	return defaultAxes;
}

function newAxis(label: string, amountSegments: number = 5): Axis {
	const axis: Axis = {
		label,
		ticks: []
	};

	for (let i = 0; i < amountSegments; i++) {
		axis.ticks.push(newTick(`Tick #${i+1}`));
	}

	return axis;
}

function newTick(label: string, location: Coordinate2D = {x: 0, y:0}): AxisTick {
	const tick: AxisTick = {
		label,
		location
	};

	return tick;
}
