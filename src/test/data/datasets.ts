import { Axis, AxisTick, Coordinate2D } from '../../store/types/RadarChartTypes';

export function testDataset(): Axis[] {
	const defaultAxes: Axis[] = [];

	for (let i = 0; i < 5; i++) {
		defaultAxes.push(newDataSeries(`Axis #${i + 1}`, 5));
	}

	return defaultAxes;
}

function newDataSeries(label: string, amountSegments: number = 5): Axis {
	const axis: Axis = {
		label,
		ticks: []
	};

	for (let i = 0; i < amountSegments; i++) {
		axis.ticks.push(newDataPoint(`Tick #${i + 1}`));
	}

	return axis;
}

function newDataPoint(label: string, location: Coordinate2D = { x: 0, y: 0 }): AxisTick {
	const tick: AxisTick = {
		label,
		location
	};

	return tick;
}
