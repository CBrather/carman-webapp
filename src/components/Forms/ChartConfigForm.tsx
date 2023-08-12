import { useEffect, useState } from 'react';
import { AxisConfigForm } from './AxisConfigForm';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber, Select, Space } from 'antd'
import {
	EdgeStyle,
	decrementAxes,
	decrementSegments,
	incrementAxes,
	incrementSegments,
	selectAxes,
	selectRadialEdgesStyle,
	updateRadialEdgesStyle
} from '../../store/slices/RadarChartConfig';

export function ChartConfigForm() {
	const dispatch = useDispatch();
	const axes = useSelector(selectAxes);
	const radialEdgesStyle = useSelector(selectRadialEdgesStyle);
	const [axesAmount, setAxesAmount] = useState(axes.length);
	const [segmentsAmount, setSegmentsAmount] = useState(axes[0].ticks.length);
	const [axesConfigForms, setAxesConfigForms] = useState<React.JSX.Element[]>();
	const [radialEdgeStyleOpts, setRadialEdgeStyleOpts] = useState<{label: string, value: string}[]>();

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

	useEffect(() => {
		const styleOptions = Object.keys(EdgeStyle)
			.filter((key) => isNaN(Number(key)))
			.map((key) => {
				return { label: key, value: EdgeStyle[key as keyof typeof EdgeStyle] as string}
			});

		setRadialEdgeStyleOpts(styleOptions);
	}, [radialEdgesStyle]);

	return (
			<Space direction="vertical">
        <Space>
        <InputNumber
          addonBefore="Axes"
          value={axesAmount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue: number = Number(event.currentTarget.value) <= 0 ? 1 : Number(event.target.value);
            setAxesAmount(newValue);
          }}
        />
        <InputNumber
          addonBefore="Segments"
          value={segmentsAmount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue: number = Number(event.currentTarget.value) <= 0 ? 1 : Number(event.target.value);
            setSegmentsAmount(newValue);
          }}
        />
				<Select
          value={radialEdgesStyle}
          onChange={(value) => {;
            dispatch(updateRadialEdgesStyle({ edgeStyle: value }));
          }}
          options={radialEdgeStyleOpts}
        />
        </Space>
			<Space direction="vertical">
				{axesConfigForms}
      </Space>
    </Space>
	);
}
