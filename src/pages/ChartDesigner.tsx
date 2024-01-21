import { Space } from 'antd';
import ChartConfigForm from '../features/RadarChartDesigner/ChartConfigForm';
import RadarChartLayout from '../features/RadarChart/Layout';
import { useSelector } from 'react-redux';
import { selectChartDesign } from '../store/slices/RadarChartDesign';
import { selectAxes } from '../store/slices/DataSet';

export default function ChartDesigner() {
	const chartDesign = useSelector(selectChartDesign);
	const datasets = useSelector(selectAxes);

	return (
		<Space>
			<RadarChartLayout datasets={datasets} design={chartDesign} />
			<ChartConfigForm />
		</Space>
	);
}
