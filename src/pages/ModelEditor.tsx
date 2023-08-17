import { Space } from 'antd';
import ChartConfigForm from '../components/Forms/ChartConfigForm';
import RadarChartLayout from '../components/Charts/RadarChartLayout';

export default function ModelEditor() {
  return (
    <Space>
      <RadarChartLayout />
      <ChartConfigForm />
    </Space>
  )
}