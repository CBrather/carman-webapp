import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { AxisConfigForm } from './AxisConfigForm';
import { useDispatch, useSelector } from 'react-redux';
import { decrementAxes, decrementSegments, incrementAxes, incrementSegments, selectAxes } from '../../store/slices/RadarChartConfig';

export function ChartConfigForm() {
	const dispatch = useDispatch();
	const axes = useSelector(selectAxes);
	const [axesAmount, setAxesAmount] = useState(axes.length);
	const [segmentsAmount, setSegmentsAmount] = useState(axes[0].ticks.length);
	const [axesConfigForms, setAxesConfigForms] = useState<React.JSX.Element[]>();

	useEffect(() => {
		if (axesAmount === axes.length) return;

		if (axesAmount < axes.length) {
			dispatch(decrementAxes());
			return;
		}

		dispatch(incrementAxes());
	}, [axesAmount]);

	useEffect(() => {
		if (segmentsAmount === axes[0].ticks.length) return;

		if (segmentsAmount < axes[0].ticks.length) {
			dispatch(decrementSegments());
			return;
		}

		dispatch(incrementSegments());
	}, [segmentsAmount]);

	useEffect(() => {
		const updatedAxesConfigForms: React.JSX.Element[] = [];
		for (let i = 0; i < axes.length; i++) {
			updatedAxesConfigForms.push(<AxisConfigForm index={i} axis={axes[i]} key={axes[i].label + i} />);
		}

		setAxesConfigForms(updatedAxesConfigForms);
	}, [axes]);

	return (
		<Form>
			<Row>
				<Col md="3" className='px-4'>
					<Form.Label className="text-white">Amount of Axes</Form.Label>
					<Form.Control
            className='form-control-sm'
						type="number"
						value={axesAmount}
						onChange={(event) => {
							const newValue: number = Number(event.currentTarget.value) <= 0 ? 1 : Number(event.target.value);
							setAxesAmount(newValue);
						}}
					/>
				</Col>
				<Col md="3" className='px-4'>
					<Form.Label className="text-white">Amount of Segments</Form.Label>
					<Form.Control
            className='form-control-sm'
						type="number"
						value={segmentsAmount}
						onChange={(event) => {
							const newValue: number = Number(event.currentTarget.value) <= 0 ? 1 : Number(event.target.value);
							setSegmentsAmount(newValue);
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col>{axesConfigForms}</Col>
			</Row>
		</Form>
	);
}
