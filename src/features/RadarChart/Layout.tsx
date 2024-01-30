import './Layout.css';
import { Axis, Coordinate2D } from '../../store/types/RadarChartTypes';
import SVGEdge from '../../components/Charts/SVGEdge';
import { RadarChartDesign } from '../../api/api.gen';

class ChartDimensions {
	width: number;
	height: number;
	center: Coordinate2D;
	radius: number;

	constructor(height: number, width: number) {
		this.height = height;
		this.width = width;
		this.center = { x: width / 2, y: height / 2 };
		this.radius = Math.min(width, height) * 0.45;
	}
}

export type RadarChartProps = {
	readonly datasets: Axis[];
	readonly design: RadarChartDesign;
	readonly onClickRadialEdge?: EdgeClickHandler;
};

export type EdgeClickHandler = (event: React.MouseEvent<SVGPathElement>, edgeIndex: number) => void;

export default function RadarChartLayout(props: RadarChartProps) {
	const dimensions = new ChartDimensions(750, 750);
	const {
		datasets,
		design,
		onClickRadialEdge = () => {
			return;
		}
	} = props;

	const axes = calculateRadialAxes(dimensions, datasets, design);
	const radialEdges = getRadialEdges(axes);
	const circularEdgesPoints = calculateCircularEdgesPoints(axes);
	const circularEdges = [...getCircularEdges(circularEdgesPoints), getOuterEdge(circularEdgesPoints)];

	function getRadialEdges(axes: Axis[]): React.JSX.Element[] {
		const edgesDesign = design.radialEdges;
		const angleInterval = 360 / axes.length;

		const axesPaths = axes.map((axis, i) => {
			const angle = design.startingAngle + i * angleInterval;
			const edgeTicks = calculateAxisTicks(dimensions, axis, angle).ticks;
			const points = edgeTicks.map((tick) => tick.location);

			return (
				<SVGEdge
					className="radial-axis"
					design={edgesDesign}
					points={points}
					key={axis.label}
					onClick={(e) => onClickRadialEdge(e, i)}
				/>
			);
		});

		return axesPaths;
	}

	function getCircularEdges(edgesPoints: Coordinate2D[][]): React.JSX.Element[] {
		const edges = edgesPoints.slice(0, -1).map((edgePoints): React.JSX.Element => {
			return (
				<SVGEdge
					closed={true}
					design={design.circularEdges}
					key={edgePoints[0].x + edgePoints[0].y}
					points={edgePoints}
				/>
			);
		});

		return edges;
	}

	function getOuterEdge(edgesPoints: Coordinate2D[][]): React.JSX.Element {
		const outerEdgePoints = edgesPoints[edgesPoints.length - 1];

		return <SVGEdge closed={true} design={design.outerEdge} points={outerEdgePoints} key="outerEdge" />;
	}

	return (
		<div
			className="chart"
			style={{
				width: dimensions.width + 'px',
				height: dimensions.height + 'px'
			}}
		>
			<svg key={design.name} width={dimensions.width} height={dimensions.height} className="chart-layout">
				{radialEdges}
				{circularEdges}
			</svg>
		</div>
	);
}

function calculateCircularEdgesPoints(axes: Axis[]): Coordinate2D[][] {
	const circularEdgesPoints: Coordinate2D[][] = [];
	const numEdges = axes[0]?.ticks.length ?? 1;

	for (let i = 0; i < numEdges; i++) {
		const sectionPoints = axes.map((axis) => axis.ticks[i].location);
		circularEdgesPoints.push(sectionPoints);
	}

	return circularEdgesPoints;
}

function calculateRadialAxes(
	chartDimensions: ChartDimensions,
	dataSeries: Axis[],
	chartDesign: RadarChartDesign
): Axis[] {
	const angleInterval = 360 / dataSeries.length;

	const calculatedAxes = dataSeries.map((axis, i): Axis => {
		return calculateAxisTicks(chartDimensions, axis, chartDesign.startingAngle + i * angleInterval);
	});

	return calculatedAxes;
}

function calculateAxisTicks(chartDimensions: ChartDimensions, inputAxis: Axis, angle: number): Axis {
	const angleRad = degrees2Radians(angle);

	const outputAxis: Axis = JSON.parse(JSON.stringify(inputAxis));
	outputAxis.ticks.push({ label: '', location: { x: 0, y: 0 } });
	const pointInterval = chartDimensions.radius / outputAxis.ticks.length;

	let previousPoint = chartDimensions.center;
	for (const tick of outputAxis.ticks) {
		const nextPoint: Coordinate2D = {
			x: previousPoint.x + pointInterval * Math.cos(angleRad),
			y: previousPoint.y + pointInterval * Math.sin(angleRad)
		};

		tick.location = nextPoint;
		previousPoint = nextPoint;
	}

	return outputAxis;
}

function degrees2Radians(degrees: number): number {
	return degrees * (Math.PI / 180);
}
