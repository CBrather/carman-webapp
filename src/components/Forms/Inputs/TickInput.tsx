import { useState } from 'react';
import { AxisTick } from '../../../store/types/RadarChartTypes';
import { Input } from 'antd';

export function TickInput(props: {
	index: number;
	tick: AxisTick;
	onInputChange: (index: number, label: string) => void;
}) {
	const [label, setLabel] = useState(props.tick.label);

	return (
		<Input
			value={label}
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				setLabel(event.target.value);
			}}
			onBlur={() => {
				props.onInputChange(props.index, label);
			}}
			onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
				if (event.key === 'Enter') {
					props.onInputChange(props.index, label);
				}
			}}
		/>
	);
}
