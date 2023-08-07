import { useEffect, useState } from 'react';
import { TickInput } from './Inputs/TickInput';
import { Axis } from '../../store/types/RadarChartTypes';
import { useDispatch } from 'react-redux';
import { updateAxis } from '../../store/slices/RadarChartConfig';

export function AxisConfigForm(props: { index: number; axis: Axis }) {
	const dispatch = useDispatch();
	const [tickInputs, setTickInputs] = useState<React.JSX.Element[]>([]);

	const onInputChange = (index: number, label: string): void => {
		const updatedAxis: Axis = { ...props.axis };
		updatedAxis.ticks[index].label = label;

		dispatch(updateAxis({ index: props.index, axis: props.axis }));
	};

	useEffect(() => {
		const newTickInputs: React.JSX.Element[] = [];
		const { ticks } = props.axis;

		for (let i = 0; i < ticks.length; i++) {
			newTickInputs.push(<TickInput index={i} onInputChange={onInputChange} key={i} />);
		}

		setTickInputs(newTickInputs);
	}, [props.axis]);

	return <>{tickInputs}</>;
}
