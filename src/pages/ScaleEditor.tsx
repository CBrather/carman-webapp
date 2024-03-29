import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { RadarChartDesign } from '../api/api.gen';
import RadarChartLayout from '../features/RadarChart/Layout';
import ScaleConfigForm from '../features/ScaleEditor/ScaleConfigForm';
import { axisSelected, selectAxes } from '../store/slices/DataSet';
import { ChartDesignState, selectChartDesign } from '../store/slices/RadarChartDesign';

function designStateToAPIType(designState: ChartDesignState): RadarChartDesign {
	const design: RadarChartDesign = {
		name: designState.name,
		circularEdges: designState.circularEdgesDesign,
		outerEdge: designState.outerEdgeDesign,
		radialEdges: designState.radialEdgesDesign,
		startingAngle: designState.startingAngle
	};

	return design;
}

export default function ModelEditor() {
	const dispatch = useDispatch();

	const chartDesign = useSelector(selectChartDesign);
	const datasets = useSelector(selectAxes);

	function onClickRadialEdge(_: React.MouseEvent, edgeIndex: number): void {
		dispatch(axisSelected(edgeIndex));
	}

	return (
		<Space>
			<RadarChartLayout
				datasets={datasets}
				design={designStateToAPIType(chartDesign)}
				onClickRadialEdge={onClickRadialEdge}
			/>
			<ScaleConfigForm />
		</Space>
	);
}
