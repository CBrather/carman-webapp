import { useEffect, useState } from 'react';
import { TickInput } from './Inputs/TickInput';
import { Axis } from '../../store/types/RadarChartTypes';
import { useDispatch } from 'react-redux';
import { updateAxis } from '../../store/slices/RadarChartConfig';
import { Input, Space } from 'antd'

export function AxisConfigForm(props: { index: number; axis: Axis }) {
	const dispatch = useDispatch();
	const [tickInputs, setTickInputs] = useState<React.JSX.Element[]>([]);
	const [label, setLabel] = useState(props.axis.label);

	const onInputChange = (index: number, label: string): void => {
		const axis: Axis = JSON.parse(JSON.stringify(props.axis));
		axis.ticks[index].label = label;

		dispatch(updateAxis({ index: props.index, axis }));
	};

	useEffect(() => {
		const newTickInputs: React.JSX.Element[] = [];
		const { ticks } = props.axis;

		for (let i = 0; i < ticks.length; i++) {
			newTickInputs.push(
        <TickInput index={i} tick={ticks[i]} onInputChange={onInputChange} key={ticks[i].label}/>
			);
		}

		setTickInputs(newTickInputs);
	}, [props.axis]);

	return (
    <>
			<Space direction="horizontal">
        <Input
          value={label}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLabel(event.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' || event.key === 'Tab') {
              const axis: Axis = JSON.parse(JSON.stringify(props.axis));
              axis.label = label;
              dispatch(updateAxis({ index: props.index, axis }));
            }
          }}
        />
			</Space>
      <Space direction="horizontal">
			  {tickInputs}
		  </Space>
    </>
	);
}
