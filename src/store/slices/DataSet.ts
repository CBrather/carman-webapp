import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { Axis, AxisTick, Coordinate2D } from '../types/RadarChartTypes';

export const SLICE_NAME = 'dataSet';

export type DataSetState = {
	axes: Axis[];
	selectedAxis: number;
};

const initialState: DataSetState = {
	axes: initDefaultAxes(),
	selectedAxis: 0
};

/*
 ** Selectors
 */
type StateWithDataSet = {
	[SLICE_NAME]: DataSetState;
};

const pickDataSetState = (state: StateWithDataSet) => state[SLICE_NAME];

export const selectAxes = createSelector([pickDataSetState], (chartDesign: DataSetState) => chartDesign.axes);
export const selectAxisByIndex = createSelector(
	[pickDataSetState, (_: StateWithDataSet, index: number) => index],
	(chartDesign: DataSetState, index: number) => chartDesign.axes[index]
);

export const selectSelectedAxis = createSelector([pickDataSetState], (chartDesign: DataSetState) => {
	return { axis: chartDesign.axes[chartDesign.selectedAxis], index: chartDesign.selectedAxis };
});

/*
 ** Slice Setup
 */
export const dataSet = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		axisLabelChanged: (state: DataSetState, action: PayloadAction<{ index: number; label: string }>) => {
			state.axes[action.payload.index].label = action.payload.label;
		},
		axisSelected: (state: DataSetState, action: PayloadAction<number>) => {
			if (action.payload < state.axes.length) state.selectedAxis = action.payload;
		},
		axisTickLabelChanged: (
			state: DataSetState,
			action: PayloadAction<{ axisIndex: number; tickIndex: number; label: string }>
		) => {
			state.axes[action.payload.axisIndex].ticks[action.payload.tickIndex].label = action.payload.label;
		},
		incrementAxes: (state: DataSetState) => {
			state.axes = JSON.parse(JSON.stringify(state.axes));
			state.axes.push(newAxis(`Axis #${state.axes.length + 1}`, state.axes[0].ticks.length));
		},
		decrementAxes: (state: DataSetState) => {
			state.axes = state.axes.slice(0, -1);
		},
		incrementSegments: (state: DataSetState) => {
			const updatedAxes = JSON.parse(JSON.stringify(state.axes));

			for (const axis of updatedAxes) {
				axis.ticks = [...axis.ticks, newTick(`Tick #${axis.ticks.length + 1}`)];
			}

			state.axes = updatedAxes;
		},
		decrementSegments: (state: DataSetState) => {
			const updatedAxes = JSON.parse(JSON.stringify(state.axes));

			for (const axis of updatedAxes) {
				axis.ticks = axis.ticks.slice(0, -1);
			}

			state.axes = updatedAxes;
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
	decrementSegments
} = dataSet.actions;

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
