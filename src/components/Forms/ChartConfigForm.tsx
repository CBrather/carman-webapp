import { useEffect, useState } from 'react';
import { AxisConfigForm } from './AxisConfigForm';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber, Space, Typography } from 'antd';
import {
	decrementAxes,
	decrementSegments,
	incrementAxes,
	incrementSegments,
	selectAxes,
	selectSelectedAxis
} from '../../store/slices/DataSet';

export default function ChartConfigForm() {
	const dispatch = useDispatch();
	const axes = useSelector(selectAxes);
	const selectedAxis = useSelector(selectSelectedAxis);
	const [axesAmount, setAxesAmount] = useState(axes.length);
	const [segmentsAmount, setSegmentsAmount] = useState(selectedAxis.axis.ticks.length);

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

	return (
		<Space direction="vertical">
			<Space>
				<InputNumber
					addonBefore="Axes"
					value={axesAmount}
					onChange={(value: number | null) => {
						const newValue: number = value && value > 0 ? value : 1;
						setAxesAmount(newValue);
					}}
				/>
				<InputNumber
					addonBefore="Segments"
					value={segmentsAmount}
					onChange={(value: number | null) => {
						const newValue: number = value && value > 0 ? value : 1;
						setSegmentsAmount(newValue);
					}}
				/>
			</Space>
			<Space direction="vertical">
				<Typography>Axis</Typography>
				<AxisConfigForm />
			</Space>
		</Space>
	);
}
