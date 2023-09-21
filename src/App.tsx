import { Layout, Menu } from 'antd';
import { EditOutlined, RadarChartOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom';
import ChartLayoutDesigner from './pages/ChartLayoutDesigner';
import ModelEditor from './pages/ModelEditor';

const { Content, Sider } = Layout;

function App() {
	const navigate = useNavigate();
	const selectedKey = useLocation().pathname;

	const highlight = () => {
		if (selectedKey === '/editor') {
			return ['editor'];
		} else if (selectedKey === '/designer') {
			return ['designer'];
		}
	};
	return (
		<Layout>
			<Sider trigger={null}>
				<Menu
					mode="inline"
					theme="dark"
					defaultSelectedKeys={['editor']}
					selectedKeys={highlight()}
					style={{ height: '100%', borderRight: 0 }}
					items={[
						{
							key: 'editor',
							icon: <RadarChartOutlined />,
							label: 'Editor',
							onClick: () => {
								navigate('/editor');
							}
						},
						{
							key: 'designer',
							icon: <EditOutlined />,
							label: 'Designer',
							onClick: () => {
								navigate('/designer');
							}
						}
					]}
				/>
			</Sider>
			<Content>
				<Routes>
					<Route path="/editor" element={<ModelEditor />} />
					<Route path="/designer" element={<ChartLayoutDesigner />} />
				</Routes>
			</Content>
		</Layout>
	);
}

export default App;
