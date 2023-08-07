import { Axis, Coordinate2D } from '../../store/types/RadarChartTypes';

export type RadarChartLayoutOptions = {
	height?: number;
	width?: number;
	startingAngle?: number;
};

export default class RadarChartLayout {
	width = 750;
	height = 750;
	sections = 5;
	startingAngle = 0;
	angleInterval: number;
	center: Coordinate2D;
	radius: number;

	private axes: Axis[] = [];
	private radialEdges: Coordinate2D[][] = [];

	constructor(axes: Axis[], opts?: RadarChartLayoutOptions) {
		if (axes.length == 0) throw Error('No axes provided to RadarChart on initialization');

		this.width = opts?.width ? opts.width : this.width;
		this.height = opts?.height ? opts.height : this.height;
		this.startingAngle = opts?.startingAngle ? opts.startingAngle : this.startingAngle;

		this.center = { x: this.width / 2, y: this.height / 2 };
		this.radius = Math.min(this.width, this.height) * 0.45;

		this.sections = axes[0]?.ticks.length ?? 1;
		this.angleInterval = 360 / axes.length;

		this.calculateAxes(JSON.parse(JSON.stringify(axes)));
	}

	calculateAxes = (axes: Axis[]): void => {
		this.axes = axes.map((axis, i): Axis => {
			return this.calculateAxisTicks(axis, this.startingAngle + i * this.angleInterval);
		});

		this.calculateRadialEdges();
	};

	recalculateAxes = (): void => {
		this.calculateAxes(this.axes);
	};

	calculateAxisTicks = (axis: Axis, angle: number): Axis => {
		const points: Coordinate2D[] = [this.center];
		const pointInterval = this.radius / this.sections;
		const angleRad = degrees2Radians(angle);

		let previousPoint = points[0];
		for (const tick of axis.ticks) {
			const nextPoint: Coordinate2D = {
				x: previousPoint.x + pointInterval * Math.cos(angleRad),
				y: previousPoint.y + pointInterval * Math.sin(angleRad)
			};

			tick.location = nextPoint;
			previousPoint = nextPoint;
		}

		return axis;
	};

	calculateRadialEdges = (): void => {
		this.radialEdges = [];

		for (let i = 0; i < this.sections; i++) {
			const sectionPoints = this.axes.map((axis) => axis.ticks[i].location);
			this.radialEdges.push(sectionPoints);
		}
	};

	getAxesPathElements = (): React.JSX.Element[] => {
		const axesPaths: React.JSX.Element[] = [];

		for (let i = 0; i < this.axes.length; i++) {
			const axisPath = this.getAxisPath(this.axes[i]);
			axesPaths.push(<path d={axisPath} key={this.axes[i].label + i} />);
		}

		return axesPaths;
	};

	getAxisPath = (axis: Axis): string => {
		const pathPoints = axis.ticks.map((tick) => tick.location);

		return this.buildSvgPath([this.center, ...pathPoints]);
	};

	getRadialEdgesPathElements = (): React.JSX.Element[] => {
		const edgePaths: React.JSX.Element[] = [];

		for (let i = 0; i < this.radialEdges.length; i++) {
			const edgePoints = this.radialEdges[i];
			const path = this.buildSvgPath(edgePoints, true);
			edgePaths.push(<path d={path} key={i} />);
		}

		return edgePaths;
	};

	buildSvgPath = (pathPoints: Coordinate2D[], close: boolean = false): string => {
		let path = `
    M${pathPoints[0].x} ${pathPoints[0].y} 
    ${pathPoints
			.slice(1)
			.map((point) => {
				return `L${point.x} ${point.y}`;
			})

			.join(' ')}
    `;

		if (close) path += ` L${pathPoints[0].x} ${pathPoints[0].y}`;

		return path;
	};
}

function degrees2Radians(degrees: number): number {
	return degrees * (Math.PI / 180);
}
