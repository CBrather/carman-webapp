import { Input, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { axisLabelChanged, axisTickLabelChanged } from '../../store/slices/DataSet';
import { Axis, AxisTick } from '../../store/types/RadarChartTypes';
import { TickInput } from './Inputs/TickInput';

type Props = {
	readonly selectedAxis: {
		axis: Axis;
		index: number;
	};
};

export function AxisConfigForm(props: Props) {
	const dispatch = useDispatch();
	const onInputChange = (index: number, label: string): void => {
		dispatch(axisTickLabelChanged({ axisIndex: selectedAxis.index, tickIndex: index, label }));
	};

	const { selectedAxis } = props;

	const [axisLabel, setAxisLabel] = useState(props.selectedAxis.axis.label);

	return (
		<>
			<Space direction="horizontal">
				<Input
					value={selectedAxis.axis.label}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setAxisLabel(event.target.value);
					}}
					onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
						if (event.key === 'Enter' || event.key === 'Tab') {
							dispatch(axisLabelChanged({ index: selectedAxis.index, label: axisLabel }));
						}
					}}
				/>
			</Space>
			<Space direction="horizontal">{generateTickInputs(selectedAxis.axis.ticks, onInputChange)}</Space>
		</>
	);
}

function generateTickInputs(
	ticks: AxisTick[],
	onInputChange: (index: number, label: string) => void
): React.JSX.Element[] {
	return ticks.map((tick, index) => {
		return <TickInput index={index} tick={tick} onInputChange={onInputChange} key={tick.label} />;
	});
}
