import { Space } from 'antd';
import ChartConfigForm from '../components/Forms/ChartConfigForm';
import RadarChartLayout from '../components/Charts/RadarChartLayout';

export default function ChartDesigner() {
	return (
		<Space>
			<RadarChartLayout />
			<ChartConfigForm />
		</Space>
	);
}
