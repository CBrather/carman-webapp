import './RadarChart.css';

import { useDispatch, useSelector } from 'react-redux';
import { axisSelected, EdgeStyle, selectChartConfig } from '../../store/slices/RadarChartConfig';
import { Axis, Coordinate2D } from '../../store/types/RadarChartTypes';
import { useEffect, useState } from 'react';

export default function RadarChartLayout() {
	const width = 750;
	const height = 750;
	const center: Coordinate2D = { x: width / 2, y: height / 2 };
	const radius = Math.min(width, height) * 0.45;

	const chartConfig = useSelector(selectChartConfig);
	const [axes, setAxes] = useState<Axis[]>(chartConfig.axes);
	const [radialEdges, setRadialEdges] = useState<Coordinate2D[][]>([]);

	const [axesPathElements, setAxesPathsElements] = useState<React.JSX.Element[]>();
	const [radialPathElements, setRadialPathElements] = useState<React.JSX.Element[]>();

	const dispatch = useDispatch();

	useEffect(() => {
		calculateAxes();

		setAxesPathsElements(getAxesPathElements());
		setRadialPathElements(getRadialEdgesPathElements());
	}, [chartConfig]);

	useEffect(() => {
		calculateRadialEdges();
		setAxesPathsElements(getAxesPathElements());
	}, [axes]);

	useEffect(() => {
		setRadialPathElements(getRadialEdgesPathElements());
	}, [radialEdges]);

	function calculateAxes() {
		const angleInterval = 360 / chartConfig.axes.length;

		const calculatedAxes = chartConfig.axes.map((axis, i): Axis => {
			return calculateAxisTicks(axis, chartConfig.startingAngle + i * angleInterval);
		});

		setAxes(calculatedAxes);
	}

	function calculateAxisTicks(inputAxis: Axis, angle: number): Axis {
		const angleRad = degrees2Radians(angle);

		const outputAxis: Axis = JSON.parse(JSON.stringify(inputAxis));
		outputAxis.ticks.push({ label: '', location: { x: 0, y: 0 } });
		const pointInterval = radius / outputAxis.ticks.length;

		let previousPoint = center;
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

	function calculateRadialEdges() {
		const radialEdges: Coordinate2D[][] = [];
		const numEdges = axes[0]?.ticks.length ?? 1;

		for (let i = 0; i < numEdges; i++) {
			const sectionPoints = axes.map((axis) => axis.ticks[i].location);
			radialEdges.push(sectionPoints);
		}

		setRadialEdges(radialEdges);
	}

	function getAxesPathElements(): React.JSX.Element[] {
		const axesPaths: React.JSX.Element[] = [];

		for (let i = 0; i < axes.length; i++) {
			const axisPath = getAxisPath(axes[i]);
			axesPaths.push(
				<path
					strokeDasharray={chartConfig.axesEdgesStyle == EdgeStyle.Dashed ? 5 : 0}
					stroke={chartConfig.axesColor}
					strokeWidth={chartConfig.axesThickness}
					className="radar-axis"
					d={axisPath}
					key={axes[i].label + i}
					onClick={() => dispatch(axisSelected(i))}
				/>
			);
		}

		return axesPaths;
	}

	function getAxisPath(axis: Axis): string {
		const pathPoints = axis.ticks.map((tick) => tick.location);

		return buildSvgPath([center, ...pathPoints]);
	}

	function getRadialEdgesPathElements(): React.JSX.Element[] {
		const edgePaths: React.JSX.Element[] = [];

		if (radialEdges.length === 0) return edgePaths;

		for (let i = 0; i < radialEdges.length - 1; i++) {
			const edgePoints = radialEdges[i];
			const path = buildSvgPath(edgePoints, true);
			edgePaths.push(
				<path
					strokeDasharray={chartConfig.radialEdgesStyle == EdgeStyle.Dashed ? 5 : 0}
					stroke={chartConfig.radialEdgesColor}
					strokeWidth={chartConfig.radialEdgesThickness}
					d={path}
					key={'radial-edge-' + i}
				/>
			);
		}

		const outerEdgePoints = radialEdges.slice(-1)[0];
		const outerPath = buildSvgPath(outerEdgePoints, true);
		edgePaths.push(
			<path
				strokeDasharray={chartConfig.outerEdgeStyle == EdgeStyle.Dashed ? 5 : 0}
				stroke={chartConfig.outerEdgeColor}
				strokeWidth={chartConfig.outerEdgeThickness}
				d={outerPath}
				key="outerEdge"
			/>
		);

		return edgePaths;
	}

	function buildSvgPath(pathPoints: Coordinate2D[], close: boolean = false): string {
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
	}

	return (
		<div
			className="LineChart"
			style={{
				width: width + 'px',
				height: height + 'px'
			}}
		>
			<svg width={width} height={height} className='chart-layout'>
				{axesPathElements}
				{radialPathElements}
			</svg>
		</div>
	);
}

function degrees2Radians(degrees: number): number {
	return degrees * (Math.PI / 180);
}
