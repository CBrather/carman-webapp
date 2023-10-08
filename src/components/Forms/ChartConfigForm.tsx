import { useEffect, useState } from 'react';
import { AxisConfigForm } from './AxisConfigForm';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPicker, InputNumber, Space, Radio, Typography, Row, Col, RadioChangeEvent } from 'antd';
import {
	EdgeStyle,
	decrementAxes,
	decrementSegments,
	incrementAxes,
	incrementSegments,
	selectAxes,
	selectAxesColor,
	selectAxesEdgesStyle,
	selectAxesThickness,
	selectOuterEdgeColor,
	selectOuterEdgeStyle,
	selectOuterEdgeThickness,
	selectRadialEdgesColor,
	selectRadialEdgesStyle,
	selectRadialEdgesThickness,
	selectSelectedAxis,
	updateAxesColor,
	updateAxesEdgesStyle,
	updateAxesThickness,
	updateOuterEdgeColor,
	updateOuterEdgeStyle,
	updateOuterEdgeThickness,
	updateRadialEdgesColor,
	updateRadialEdgesStyle,
	updateRadialEdgesThickness
} from '../../store/slices/RadarChartDesign';
import { Color } from 'antd/es/color-picker';

export default function ChartConfigForm() {
	const dispatch = useDispatch();
	const axes = useSelector(selectAxes);
	const axesEdgesStyle = useSelector(selectAxesEdgesStyle);
	const radialEdgesStyle = useSelector(selectRadialEdgesStyle);
	const outerEdgeStyle = useSelector(selectOuterEdgeStyle);
	const axesColor = useSelector(selectAxesColor);
	const outerEdgeColor = useSelector(selectOuterEdgeColor);
	const radialEdgesColor = useSelector(selectRadialEdgesColor);
	const axesThickness = useSelector(selectAxesThickness);
	const outerEdgeThickness = useSelector(selectOuterEdgeThickness);
	const radialEdgesThickness = useSelector(selectRadialEdgesThickness);
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
				<Typography>Axes Edges</Typography>
				<Row>
					<Col span={8}>
						<Radio.Group
							value={axesEdgesStyle}
							onChange={(event: RadioChangeEvent) => {
								dispatch(updateAxesEdgesStyle({ edgeStyle: event.target.value as EdgeStyle }));
							}}
						>
							{edgeStyleOpts}
						</Radio.Group>
					</Col>
					<Col span={6}>
						<ColorPicker
							showText
							value={axesColor}
							onChangeComplete={(value: Color) => {
								dispatch(updateAxesColor({ color: value.toHexString() }));
							}}
						/>
					</Col>
					<Col span={8}>
						<InputNumber
							addonBefore="Thickness"
							value={axesThickness}
							onChange={(value: number | null) => {
								dispatch(updateAxesThickness({ thickness: value || 1 }));
							}}
						/>
					</Col>
				</Row>
			</Space>
			<Space direction="vertical">
				<Typography>Radial Edges</Typography>
				<Row>
					<Col span={8}>
						<Radio.Group
							value={radialEdgesStyle}
							onChange={(event: RadioChangeEvent) => {
								dispatch(updateRadialEdgesStyle({ edgeStyle: event.target.value as EdgeStyle }));
							}}
						>
							{edgeStyleOpts}
						</Radio.Group>
					</Col>
					<Col span={6}>
						<ColorPicker
							showText
							value={radialEdgesColor}
							onChangeComplete={(value: Color) => {
								dispatch(updateRadialEdgesColor({ color: value.toHexString() }));
							}}
						/>
					</Col>
					<Col span={8}>
						<InputNumber
							addonBefore="Thickness"
							value={radialEdgesThickness}
							onChange={(value: number | null) => {
								dispatch(updateRadialEdgesThickness({ thickness: value || 1 }));
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
							value={outerEdgeStyle}
							onChange={(event: RadioChangeEvent) => {
								dispatch(updateOuterEdgeStyle({ edgeStyle: event.target.value as EdgeStyle }));
							}}
						>
							{edgeStyleOpts}
						</Radio.Group>
					</Col>
					<Col span={6}>
						<ColorPicker
							showText
							value={outerEdgeColor}
							onChangeComplete={(value: Color) => {
								dispatch(updateOuterEdgeColor({ color: value.toHexString() }));
							}}
						/>
					</Col>
					<Col span={8}>
						<InputNumber
							addonBefore="Thickness"
							value={outerEdgeThickness}
							onChange={(value: number | null) => {
								dispatch(updateOuterEdgeThickness({ thickness: value || 1 }));
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
