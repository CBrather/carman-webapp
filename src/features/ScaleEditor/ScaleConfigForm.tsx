import { Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

import { AxisConfigForm } from '../../components/Forms/AxisConfigForm';
import { selectSelectedAxis } from '../../store/slices/DataSet';

export default function ScaleConfigForm() {
	const selectedAxis = useSelector(selectSelectedAxis);

	return (
		<Space direction="vertical">
			<Space direction="vertical">
				<Typography>Dimension</Typography>
				<AxisConfigForm selectedAxis={selectedAxis} />
			</Space>
		</Space>
	);
}
