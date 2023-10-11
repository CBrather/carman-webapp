import { Space } from 'antd';
import ChartConfigForm from '../components/Forms/ChartConfigForm';
import RadarChartLayout from '../features/RadarChart/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartDesign } from '../store/slices/RadarChartDesign';
import { axisSelected, selectAxes } from '../store/slices/DataSet';

export default function ModelEditor() {
	const dispatch = useDispatch();

	const chartDesign = useSelector(selectChartDesign);
	const datasets = useSelector(selectAxes);

	function onClickRadialEdge(_: React.MouseEvent, edgeIndex: number): void {
		dispatch(axisSelected(edgeIndex));
	}

	return (
		<Space>
			<RadarChartLayout datasets={datasets} design={chartDesign} onClickRadialEdge={onClickRadialEdge} />
			<ChartConfigForm />
		</Space>
	);
}
