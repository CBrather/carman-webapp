import { ChangeEvent, useEffect, useState } from 'react';
import { AxisConfigForm } from './AxisConfigForm';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber, Space, Radio, Typography } from 'antd'
import {
	EdgeStyle,
	decrementAxes,
	decrementSegments,
	incrementAxes,
	incrementSegments,
	selectAxes,
	selectAxesEdgesStyle,
	selectRadialEdgesStyle,
	selectSelectedAxis,
	updateAxesEdgesStyle,
	updateRadialEdgesStyle
} from '../../store/slices/RadarChartConfig';

export function ChartConfigForm() {
	const dispatch = useDispatch();
	const axes = useSelector(selectAxes);
  const axesEdgesStyle = useSelector(selectAxesEdgesStyle);
	const radialEdgesStyle = useSelector(selectRadialEdgesStyle);
  const selectedAxis = useSelector(selectSelectedAxis)
	const [axesAmount, setAxesAmount] = useState(axes.length);
	const [segmentsAmount, setSegmentsAmount] = useState(selectedAxis.axis.ticks.length);
	const [axesEdgeStyleOpts, setAxesEdgeStyleOpts] = useState<React.JSX.Element[]>([]);
	const [radialEdgeStyleOpts, setRadialEdgeStyleOpts] = useState<React.JSX.Element[]>([]);

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
				return <Radio.Button value={EdgeStyle[key as keyof typeof EdgeStyle]} key={key}>{key}</Radio.Button>
			});

		setRadialEdgeStyleOpts(styleOptions);
	}, []);

	return (
			<Space direction="vertical">
        <Space>
        <InputNumber
          addonBefore="Axes"
          value={axesAmount}
          onChange={(value: number) => {
            const newValue: number = value <= 0 ? 1 : value;
            setAxesAmount(newValue);
          }}
        />
        <InputNumber
          addonBefore="Segments"
          value={segmentsAmount}
          onChange={(value: number) => {
            const newValue: number = value <= 0 ? 1 : value;
            setSegmentsAmount(newValue);
          }}
        />
        </Space>
        <Radio.Group value={axesEdgesStyle} onChange={(event: ChangeEvent<HTMLSelectElement>) => {;
            dispatch(updateAxesEdgesStyle({ edgeStyle: event.target.value as EdgeStyle }));
          }}>
          <Typography type="primary">Axes Edges</Typography>
          {radialEdgeStyleOpts}
        </Radio.Group>
        <Radio.Group value={radialEdgesStyle} onChange={(event: ChangeEvent<HTMLSelectElement>) => {;
            dispatch(updateRadialEdgesStyle({ edgeStyle: event.target.value as EdgeStyle }));
          }}>
          <Typography type="primary">Radial Edges</Typography>
          {radialEdgeStyleOpts}
        </Radio.Group>
			<Space direction="vertical">
        <Typography type="primary">Axis</Typography>
        <AxisConfigForm />
      </Space>
    </Space>
	);
}
