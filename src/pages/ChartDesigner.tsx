import { Space } from 'antd';
import ChartConfigForm from '../components/Forms/ChartConfigForm';
import RadarChartLayout from '../features/RadarChart/RadarChartLayout';

export default function ChartDesigner() {
	return (
		<Space>
			<RadarChartLayout />
			<ChartConfigForm />
		</Space>
	);
}
