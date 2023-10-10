import { Space } from 'antd';
import ChartConfigForm from '../components/Forms/ChartConfigForm';
import RadarChartLayout from '../features/RadarChart/RadarChartLayout';

export default function ModelEditor() {
	return (
		<Space>
			<RadarChartLayout />
			<ChartConfigForm />
		</Space>
	);
}
