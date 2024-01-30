import { Space } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
	EdgeDesign,
	RadarChartDesign,
	usePostChartsDesignsRadarMutation,
	usePutChartsDesignsRadarByDesignIdMutation
} from '../api/api.gen';
import RadarChartLayout from '../features/RadarChart/Layout';
import ChartConfigForm from '../features/RadarChartDesigner/ChartConfigForm';
import { selectAxes } from '../store/slices/DataSet';
import { EdgeStyle } from '../store/slices/RadarChartDesign';

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

interface Props {
	readonly initialDesign?: RadarChartDesign;
}

export default function ChartDesigner(props?: Props) {
	const [chartDesign, setChartDesign] = useState(props?.initialDesign ?? DEFAULT_CHART_DESIGN);
	const [designID, setDesignID] = useState(props?.initialDesign?.id ?? '');

	const datasets = useSelector(selectAxes);

	const [saveNewDesign] = usePostChartsDesignsRadarMutation();
	const [updateDesign] = usePutChartsDesignsRadarByDesignIdMutation();

	const onConfigChange = (design: RadarChartDesign) => {
		setChartDesign({ ...design, id: designID });
	};

	const onSubmit = async () => {
		if (chartDesign.id) {
			return updateDesign({ designId: chartDesign.id, radarChartDesign: chartDesign }).unwrap();
		}

		const savedDesign = await saveNewDesign({ radarChartDesign: chartDesign }).unwrap();
		if (savedDesign.id) setDesignID(savedDesign.id);

		return savedDesign;
	};

	return (
		<Space>
			<RadarChartLayout datasets={datasets} design={chartDesign} />
			<ChartConfigForm defaultDesign={chartDesign} onChange={onConfigChange} onSubmit={onSubmit} />
		</Space>
	);
}
