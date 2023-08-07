export type Axis = {
	label: string;
	ticks: AxisTick[];
};

export type AxisTick = {
	label: string;
	location: Coordinate2D;
};

export type Coordinate2D = {
	x: number;
	y: number;
};
