import { useState } from 'react';
import { Button, InputNumber, Space, Input } from 'antd';
import { EdgeConfigForm } from '../../components/Forms/EdgeConfig';
import { DegreesSlider } from '../../components/Forms/Inputs/DegreesSlider';
import { EdgeDesign, RadarChartDesign } from '../../api/api.gen';

interface Props {
	readonly defaultDesign: RadarChartDesign;
	readonly onSubmit: () => Promise<RadarChartDesign>;
	readonly onChange: (chartDesign: RadarChartDesign) => void;
}

export default function ChartConfigForm(props: Props) {
	const [axesAmount, setAxesAmount] = useState(5);
	const [segmentsAmount, setSegmentsAmount] = useState(5);

	const [locked, setLocked] = useState(false);

	const [circularEdges, setCircularEdges] = useState(props.defaultDesign.circularEdges);
	const [name, setName] = useState(props.defaultDesign.name);
	const [outerEdge, setOuterEdge] = useState(props.defaultDesign.outerEdge);
	const [radialEdges, setRadialEdges] = useState(props.defaultDesign.radialEdges);
	const [startingAngle, setStartingAngle] = useState(props.defaultDesign.startingAngle);

	const onSubmit = () => {
		setLocked(true);
		props.onSubmit().finally(() => setLocked(false));
	};

	return (
		<Space direction="vertical">
			<Input
				variant="borderless"
				disabled={locked}
				size="large"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
					props.onChange({
						name: event.target.value,
						circularEdges,
						outerEdge,
						radialEdges,
						startingAngle
					});
				}}
			/>
			<Space>
				<InputNumber
					addonBefore="Axes"
					disabled={locked}
					value={axesAmount}
					onChange={(value: number | null) => {
						const newValue: number = value && value > 0 ? value : 1;
						setAxesAmount(newValue);
					}}
				/>
				<InputNumber
					addonBefore="Segments"
					disabled={locked}
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
					props.onChange({
						name,
						circularEdges,
						outerEdge,
						radialEdges: design,
						startingAngle
					});
				}}
			/>
			<EdgeConfigForm
				title="Circular Edges"
				design={circularEdges}
				onConfigChange={(design: EdgeDesign) => {
					setCircularEdges(design);
					props.onChange({
						name,
						circularEdges: design,
						outerEdge,
						radialEdges,
						startingAngle
					});
				}}
			/>
			<EdgeConfigForm
				title="Outer Edges"
				design={outerEdge}
				onConfigChange={(design: EdgeDesign) => {
					setOuterEdge(design);
					props.onChange({
						name,
						circularEdges,
						outerEdge: design,
						radialEdges,
						startingAngle
					});
				}}
			/>
			<DegreesSlider
				title="Starting Angle"
				value={startingAngle}
				onChange={(value: number) => {
					setStartingAngle(value);
					props.onChange({
						name,
						circularEdges,
						outerEdge,
						radialEdges,
						startingAngle: value
					});
				}}
			/>
			<Button type="primary" disabled={locked} onClick={onSubmit}>
				Save
			</Button>
		</Space>
	);
}
