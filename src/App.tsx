import './App.css';
import { Space } from 'antd'
import { ChartConfigForm } from './components/Forms/ChartConfigForm';
import RadarChartLayout from './components/Charts/RadarChartLayout';

function App() {
	return (
    <Space>
      <RadarChartLayout />
      <ChartConfigForm />
    </Space>
	);
}

export default App;
