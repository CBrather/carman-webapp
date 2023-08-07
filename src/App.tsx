import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RadarChart from './components/Charts/RadarChart';
import { ChartConfigForm } from './components/Forms/ChartConfigForm';

function App() {
	return (
		<Container fluid>
			<Row>
				<Col>
					<RadarChart />
				</Col>
				<Col>
					<ChartConfigForm />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
