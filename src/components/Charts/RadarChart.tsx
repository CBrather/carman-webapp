import './RadarChart.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RadarChartLayout from './RadarChartLayout';
import { selectAxes, selectChartConfig } from '../../store/slices/RadarChartConfig';

export default function RadarChart() {
	const [chartLayout, setChartLayout] = useState(new RadarChartLayout(useSelector(selectAxes)));
	const [axesPathElements, setAxesPathsElements] = useState<React.JSX.Element[]>();
	const [radialPathElements, setRadialPathElements] = useState<React.JSX.Element[]>();

	const chartConfig = useSelector(selectChartConfig);

	useEffect(() => {
		setChartLayout(new RadarChartLayout(chartConfig.axes));
	}, [chartConfig]);

	useEffect(() => {
		setAxesPathsElements(chartLayout.getAxesPathElements());
		setRadialPathElements(chartLayout.getRadialEdgesPathElements());
	}, [chartLayout]);

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
