import { Col, ColorPicker, InputNumber, Radio, RadioChangeEvent, Row, Space, Typography } from 'antd';
import { Color } from 'antd/es/color-picker';

import { EdgeDesign } from '../../api/api.gen';
import { EdgeStyle } from '../../store/slices/RadarChartDesign';

interface Props {
	readonly design: EdgeDesign;
	readonly title: string;
	readonly onConfigChange: (design: EdgeDesign) => void;
}

const styleOptions = Object.keys(EdgeStyle)
	.filter((key) => isNaN(Number(key)))
	.map((key) => {
		return (
			<Radio.Button value={EdgeStyle[key as keyof typeof EdgeStyle]} key={key}>
				{key}
			</Radio.Button>
		);
	});

export function EdgeConfigForm(props: Props) {
	return (
		<Space direction="vertical" data-testid={props.title}>
			<Typography>{props.title}</Typography>
			<Row>
				<Col span={8}>
					<Radio.Group
						value={props.design.style}
						onChange={(event: RadioChangeEvent) => {
							const design = { ...props.design };
							design.style = event.target.value as EdgeStyle;
							props.onConfigChange(design);
						}}
					>
						{styleOptions}
					</Radio.Group>
				</Col>
				<Col span={6}>
					<ColorPicker
						showText
						value={props.design.color}
						onChangeComplete={(value: Color) => {
							const design = { ...props.design };
							design.color = value.toHexString();
							props.onConfigChange(design);
						}}
					/>
				</Col>
				<Col span={8}>
					<InputNumber
						addonBefore="Thickness"
						value={props.design.thickness}
						onChange={(value: number | null) => {
							value = value ?? 0;

							const design = { ...props.design };
							design.thickness = value > 0 ? value : 1;
							props.onConfigChange(design);
						}}
					/>
				</Col>
			</Row>
		</Space>
	);
}
