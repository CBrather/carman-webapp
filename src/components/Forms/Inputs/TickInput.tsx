import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export function TickInput(props: { index: number; onInputChange: (index: number, label: string) => void }) {
	return (
		<ListGroup.Item>
			<Form.Control
      className='form-control-sm'
				type="text"
				onChange={(event) => {
					props.onInputChange(props.index, event.target.value);
				}}
			/>
		</ListGroup.Item>
	);
}
