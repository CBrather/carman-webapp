import { useEffect, useState } from 'react';
import { TickInput } from './Inputs/TickInput';
import { Axis } from '../../store/types/RadarChartTypes';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedAxis, updateAxis } from '../../store/slices/RadarChartConfig';
import { Input, Space } from 'antd'

export function AxisConfigForm() {
	const dispatch = useDispatch();
  const selectedAxis = useSelector(selectSelectedAxis)

	const [tickInputs, setTickInputs] = useState<React.JSX.Element[]>([]);
	const [label, setLabel] = useState(selectedAxis.axis.label);

	const onInputChange = (index: number, label: string): void => {
		const axis: Axis = JSON.parse(JSON.stringify(selectedAxis.axis));
		axis.ticks[index].label = label;

		dispatch(updateAxis({ index: selectedAxis.index, axis }));
	};

	useEffect(() => {
		const newTickInputs: React.JSX.Element[] = [];
		const { ticks } = selectedAxis.axis;

		for (let i = 0; i < ticks.length; i++) {
			newTickInputs.push(
        <TickInput index={i} tick={ticks[i]} onInputChange={onInputChange} key={ticks[i].label}/>
			);
		}

		setTickInputs(newTickInputs);
	}, [selectedAxis]);

	return (
    <>
			<Space direction="horizontal">
        <Input
          value={selectedAxis.axis.label}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLabel(event.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' || event.key === 'Tab') {
              const axis: Axis = JSON.parse(JSON.stringify(selectedAxis.axis));
              axis.label = label;
              dispatch(updateAxis({ index: selectedAxis.index, axis }));
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
