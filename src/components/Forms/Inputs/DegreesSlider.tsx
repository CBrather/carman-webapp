import { useEffect, useState } from 'react';
import { Col, InputNumber, Row, Slider, Typography } from 'antd';

const VALUE_MIN = 0;
const VALUE_MAX = 359;

interface Props {
	readonly title: string;
	readonly onChange: (value: number) => void;
	readonly defaultValue: number;
}

export function DegreesSlider(props: Props) {
	let defaultValue = props.defaultValue;
	if (defaultValue < VALUE_MIN) defaultValue = VALUE_MIN;
	if (defaultValue > VALUE_MAX) defaultValue = VALUE_MAX;

	const [sliderValue, setSliderValue] = useState(defaultValue);

	useEffect(() => {
		props.onChange(sliderValue);
	}, [sliderValue, props]);

	return (
		<>
			<Typography>{props.title}</Typography>
			<Row>
				<Col span={14}>
					<Slider min={0} max={359} value={sliderValue} onChange={(value) => setSliderValue(value)} />
				</Col>
				<Col span={8}>
					<InputNumber min={0} max={359} value={sliderValue} onChange={(value) => setSliderValue(value ?? 0)} />
				</Col>
			</Row>
		</>
	);
}
