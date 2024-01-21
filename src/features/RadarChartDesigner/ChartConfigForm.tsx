import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber, Space, Input } from 'antd';
import { EdgeConfigForm } from '../../components/Forms/EdgeConfig';
import {
	selectCircularEdgesDesign,
	selectOuterEdgeDesign,
	selectRadialEdgesDesign,
	selectName,
	nameChanged,
	radialEdgesDesignChanged,
	EdgeDesign,
	circularEdgesDesignChanged,
	outerEdgeDesignChanged
} from '../../store/slices/RadarChartDesign';

export default function ChartConfigForm() {
	const dispatch = useDispatch();
	const circularEdgesDesign = useSelector(selectCircularEdgesDesign);
	const outerEdgeDesign = useSelector(selectOuterEdgeDesign);
	const radialEdgesDesign = useSelector(selectRadialEdgesDesign);
	const [name, setName] = useState(useSelector(selectName));
	const [axesAmount, setAxesAmount] = useState(5);
	const [segmentsAmount, setSegmentsAmount] = useState(5);

	return (
		<Space direction="vertical">
			<Input
				bordered={false}
				size="large"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
				onBlur={() => {
					dispatch(nameChanged(name));
				}}
				onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
					if (event.key === 'Enter') {
						dispatch(nameChanged(name));
					}
				}}
			/>
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
			<EdgeConfigForm
				title="Radial Edges"
				design={radialEdgesDesign}
				onConfigChange={(design: EdgeDesign) => dispatch(radialEdgesDesignChanged(design))}
			/>
			<EdgeConfigForm
				title="Circular Edges"
				design={circularEdgesDesign}
				onConfigChange={(design: EdgeDesign) => dispatch(circularEdgesDesignChanged(design))}
			/>
			<EdgeConfigForm
				title="Outer Edges"
				design={outerEdgeDesign}
				onConfigChange={(design: EdgeDesign) => dispatch(outerEdgeDesignChanged(design))}
			/>
		</Space>
	);
}
