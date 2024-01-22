import { AxisConfigForm } from '../../components/Forms/AxisConfigForm';
import { Space, Typography } from 'antd';

export default function ScaleConfigForm() {
	return (
		<Space direction="vertical">
			<Space direction="vertical">
				<Typography>Dimension</Typography>
				<AxisConfigForm />
			</Space>
		</Space>
	);
}
