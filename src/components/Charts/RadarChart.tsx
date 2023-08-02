import './RadarChart.css';
import { useEffect, useState } from 'react';
import RadarChartLayout, { AxisUncalculated } from './RadarChartLayout';

export default function RadarChart(props: { axes: AxisUncalculated[] }) {
	const [chartLayout, setChartLayout] = useState(new RadarChartLayout(props.axes));
	const [axesPathElements, setAxesPathsElements] = useState<React.JSX.Element[]>();
	const [radialPathElements, setRadialPathElements] = useState<React.JSX.Element[]>();

	useEffect(
		() => {
			const rawAxesPaths = chartLayout.getAxesPaths();
			const axesPathElements = rawAxesPaths.map((p, i) => <path d={p} key={'axisPath-' + i} />);

			setAxesPathsElements(axesPathElements);

			const rawRadialPaths = chartLayout.getRadialEdgesPaths();
			const radialPathElements = rawRadialPaths.map((p, i) => <path d={p} key={'radialPath-' + i} />);

			setRadialPathElements(radialPathElements);
		},
		[chartLayout]
	);

	return (
		<div
			className="LineChart"
			style={{
				width: chartLayout.width + 'px',
				height: chartLayout.height + 'px'
			}}
		>
			<svg width={chartLayout.width} height={chartLayout.height}>
				{axesPathElements}
				{radialPathElements}
			</svg>
		</div>
	);
}
