import './RadarChart.css';
import { useEffect, useState } from 'react';
import RadarChartLayout from './RadarChartLayout.ts';

export default function RadarChart(props: { numberAxes: number }) {
	const [chartLayout, setChartLayout] = useState(new RadarChartLayout({ axes: props.numberAxes }));
	const [axesPathElements, setAxesPathsElements] = useState<React.JSX.Element[]>();

	useEffect(
		() => {
			const rawPaths = chartLayout.getAxesPaths();
			const pathElements = rawPaths.map((p, i) => <path d={p} key={'chartPath-' + i} />);

			setAxesPathsElements(pathElements);
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
			</svg>
		</div>
	);
}
