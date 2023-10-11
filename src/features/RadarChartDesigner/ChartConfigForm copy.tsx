import { useEffect, useState } from 'react';
import { AxisConfigForm } from '../../components/Forms/AxisConfigForm';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPicker, InputNumber, Space, Radio, Typography, Row, Col, RadioChangeEvent } from 'antd';
import {
	EdgeStyle,
	selectCircularEdgesDesign,
	selectOuterEdgeDesign,
	selectRadialEdgesDesign,
	outerEdgeColorChanged,
	outerEdgeStyleChanged,
	outerEdgeThicknessChanged,
	radialEdgesColorChanged,
	radialEdgesStyleChanged,
	radialEdgesThicknessChanged,
	circularEdgesStyleChanged,
	circularEdgesColorChanged,
	circularEdgesThicknessChanged
} from '../../store/slices/RadarChartDesign';
import {
	decrementAxes,
	decrementSegments,
	incrementAxes,
	incrementSegments,
	selectAxes,
	selectSelectedAxis
} from '../../store/slices/DataSet';
import { Color } from 'antd/es/color-picker';

export default function ChartConfigForm() {
	const dispatch = useDispatch();
	const axes = useSelector(selectAxes);
	const circularEdgesDesign = useSelector(selectCircularEdgesDesign);
	const outerEdgeDesign = useSelector(selectOuterEdgeDesign);
	const radialEdgesDesign = useSelector(selectRadialEdgesDesign);
	const selectedAxis = useSelector(selectSelectedAxis);
	const [axesAmount, setAxesAmount] = useState(axes.length);
	const [segmentsAmount, setSegmentsAmount] = useState(selectedAxis.axis.ticks.length);
	const [edgeStyleOpts, setEdgeStyleOpts] = useState<React.JSX.Element[]>([]);

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
		const styleOptions = Object.keys(EdgeStyle)
			.filter((key) => isNaN(Number(key)))
			.map((key) => {
				return (
					<Radio.Button value={EdgeStyle[key as keyof typeof EdgeStyle]} key={key}>
						{key}
					</Radio.Button>
				);
			});

		setEdgeStyleOpts(styleOptions);
	}, []);

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
				<Typography>Radial Edges</Typography>
				<Row>
					<Col span={8}>
						<Radio.Group
							value={radialEdgesDesign.style}
							onChange={(event: RadioChangeEvent) => {
								dispatch(radialEdgesStyleChanged({ edgeStyle: event.target.value as EdgeStyle }));
							}}
						>
							{edgeStyleOpts}
						</Radio.Group>
					</Col>
					<Col span={6}>
						<ColorPicker
							showText
							value={radialEdgesDesign.color}
							onChangeComplete={(value: Color) => {
								dispatch(radialEdgesColorChanged({ color: value.toHexString() }));
							}}
						/>
					</Col>
					<Col span={8}>
						<InputNumber
							addonBefore="Thickness"
							value={radialEdgesDesign.thickness}
							onChange={(value: number | null) => {
								dispatch(radialEdgesThicknessChanged({ thickness: value ?? 1 }));
							}}
						/>
					</Col>
				</Row>
			</Space>
			<Space direction="vertical">
				<Typography>Circular Edges</Typography>
				<Row>
					<Col span={8}>
						<Radio.Group
							value={circularEdgesDesign.style}
							onChange={(event: RadioChangeEvent) => {
								dispatch(circularEdgesStyleChanged({ edgeStyle: event.target.value as EdgeStyle }));
							}}
						>
							{edgeStyleOpts}
						</Radio.Group>
					</Col>
					<Col span={6}>
						<ColorPicker
							showText
							value={circularEdgesDesign.color}
							onChangeComplete={(value: Color) => {
								dispatch(circularEdgesColorChanged({ color: value.toHexString() }));
							}}
						/>
					</Col>
					<Col span={8}>
						<InputNumber
							addonBefore="Thickness"
							value={circularEdgesDesign.thickness}
							onChange={(value: number | null) => {
								dispatch(circularEdgesThicknessChanged({ thickness: value ?? 1 }));
							}}
						/>
					</Col>
				</Row>
			</Space>
			<Space direction="vertical">
				<Typography>Outer Edge</Typography>
				<Row>
					<Col span={8}>
						<Radio.Group
							value={outerEdgeDesign.style}
							onChange={(event: RadioChangeEvent) => {
								dispatch(outerEdgeStyleChanged({ edgeStyle: event.target.value as EdgeStyle }));
							}}
						>
							{edgeStyleOpts}
						</Radio.Group>
					</Col>
					<Col span={6}>
						<ColorPicker
							showText
							value={outerEdgeDesign.color}
							onChangeComplete={(value: Color) => {
								dispatch(outerEdgeColorChanged({ color: value.toHexString() }));
							}}
						/>
					</Col>
					<Col span={8}>
						<InputNumber
							addonBefore="Thickness"
							value={outerEdgeDesign.thickness}
							onChange={(value: number | null) => {
								dispatch(outerEdgeThicknessChanged({ thickness: value ?? 1 }));
							}}
						/>
					</Col>
				</Row>
			</Space>
			<Space direction="vertical">
				<Typography>Axis</Typography>
				<AxisConfigForm />
			</Space>
		</Space>
	);
}
