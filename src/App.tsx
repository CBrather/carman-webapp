import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ChartConfigForm } from './components/Forms/ChartConfigForm';
import RadarChartLayout from './components/Charts/RadarChartLayout';

function App() {
	return (
		<Container fluid>
			<Row>
				<Col md="6">
					<RadarChartLayout />
				</Col>
				<Col md="6">
					<ChartConfigForm />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
