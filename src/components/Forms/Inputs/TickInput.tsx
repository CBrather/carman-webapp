import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AxisTick } from '../../../store/types/RadarChartTypes';

export function TickInput(props: { index: number; tick: AxisTick; onInputChange: (index: number, label: string) => void }) {
	const [label, setLabel] = useState(props.tick.label);

	return (
		<ListGroup.Item>
			<Form.Control
				className="form-control-sm"
				type="text"
				value={label}
				onChange={(event) => {
					setLabel(event.target.value);
				}}
				onBlur={() => {
					props.onInputChange(props.index, label);
				}}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						props.onInputChange(props.index, label);
					}
				}}
			/>
		</ListGroup.Item>
	);
}
