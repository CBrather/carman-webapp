import { useState } from 'react';
import { InputNumber, Space, Input } from 'antd';
import { EdgeConfigForm } from '../../components/Forms/EdgeConfig';
import { DegreesSlider } from '../../components/Forms/Inputs/DegreesSlider';
import { EdgeDesign, RadarChartDesign } from '../../api/api.gen';

interface Props {
	readonly defaultDesign: RadarChartDesign;
	readonly onChange: (chartDesign: RadarChartDesign) => void;
}

export default function ChartConfigForm(props: Props) {
	const [axesAmount, setAxesAmount] = useState(5);
	const [segmentsAmount, setSegmentsAmount] = useState(5);

	const [circularEdges, setCircularEdges] = useState(props.defaultDesign.circularEdges);
	const [name, setName] = useState(props.defaultDesign.name);
	const [outerEdge, setOuterEdge] = useState(props.defaultDesign.outerEdge);
	const [radialEdges, setRadialEdges] = useState(props.defaultDesign.radialEdges);
	const [startingAngle, setStartingAngle] = useState(props.defaultDesign.startingAngle);

	const propagateChange = () => {
		props.onChange({
			name,
			circularEdges,
			outerEdge,
			radialEdges,
			startingAngle
		});
	};

	return (
		<Space direction="vertical">
			<Input
				variant="borderless"
				size="large"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
				onBlur={propagateChange}
				onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
					if (event.key === 'Enter') propagateChange();
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
				design={radialEdges}
				onConfigChange={(design: EdgeDesign) => {
					setRadialEdges(design);
					propagateChange();
				}}
			/>
			<EdgeConfigForm
				title="Circular Edges"
				design={circularEdges}
				onConfigChange={(design: EdgeDesign) => {
					setCircularEdges(design);
					propagateChange();
				}}
			/>
			<EdgeConfigForm
				title="Outer Edges"
				design={outerEdge}
				onConfigChange={(design: EdgeDesign) => {
					setOuterEdge(design);
					propagateChange();
				}}
			/>
			<DegreesSlider
				title="Starting Angle"
				defaultValue={startingAngle}
				onChange={(value: number) => {
					setStartingAngle(value);
					propagateChange();
				}}
			/>
		</Space>
	);
}
