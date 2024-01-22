import { Space } from 'antd';
import ChartConfigForm from '../features/RadarChartDesigner/ChartConfigForm';
import RadarChartLayout from '../features/RadarChart/Layout';
import { useSelector } from 'react-redux';
import { EdgeStyle } from '../store/slices/RadarChartDesign';
import { selectAxes } from '../store/slices/DataSet';
import { useState } from 'react';
import { EdgeDesign, RadarChartDesign } from '../api/api.gen';

const DEFAULT_EDGE_DESIGN: EdgeDesign = {
	color: '#838383',
	style: EdgeStyle.Solid,
	thickness: 1
};
const DEFAULT_CHART_DESIGN: RadarChartDesign = {
	name: 'New Design',
	circularEdges: DEFAULT_EDGE_DESIGN,
	outerEdge: DEFAULT_EDGE_DESIGN,
	radialEdges: DEFAULT_EDGE_DESIGN,
	startingAngle: 0
};

export default function ChartDesigner() {
	const [chartDesign, setChartDesign] = useState(DEFAULT_CHART_DESIGN);
	const datasets = useSelector(selectAxes);

	const onConfigChange = (design: RadarChartDesign) => setChartDesign(design);

	return (
		<Space>
			<RadarChartLayout datasets={datasets} design={chartDesign} />
			<ChartConfigForm defaultDesign={chartDesign} onChange={onConfigChange} />
		</Space>
	);
}
