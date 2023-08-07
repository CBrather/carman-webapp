import { useEffect, useState } from 'react';
import { TickInput } from './Inputs/TickInput';
import { Axis } from '../../store/types/RadarChartTypes';
import { useDispatch } from 'react-redux';
import { updateAxis } from '../../store/slices/RadarChartConfig';
import { Col, Container, Form, ListGroup, Row } from 'react-bootstrap';

export function AxisConfigForm(props: { index: number; axis: Axis }) {
	const dispatch = useDispatch();
	const [tickInputs, setTickInputs] = useState<React.JSX.Element[]>([]);
  const [label, setLabel] = useState(props.axis.label)

	const onInputChange = (index: number, label: string): void => {
		const updatedAxis: Axis = { ...props.axis };
		updatedAxis.ticks[index].label = label;

		dispatch(updateAxis({ index: props.index, axis: props.axis }));
	};

	useEffect(() => {
		const newTickInputs: React.JSX.Element[] = [];
		const { ticks } = props.axis;

		for (let i = 0; i < ticks.length; i++) {
			newTickInputs.push(<Col key={i} md="2" className='py-1'><TickInput index={i} onInputChange={onInputChange} /></Col>);
		}

		setTickInputs(newTickInputs);
	}, [props.axis]);

	return (
    <Container>
      <Row className='mt-4 mb-1'>
        <Col md="4">
          <Form.Control
          className='form-control-sm'
            type="text"
            onChange={(event) => {
              setLabel(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        {tickInputs}
      </Row>
    </Container>
  );
}
