import { Layout, Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { EditOutlined, RadarChartOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';

import ChartDesigner from './pages/ChartDesigner';
import Homepage from './pages/Home';
import ModelEditor from './pages/ScaleEditor';
import { GetEnvironmentConfig } from './services/Environment';

const { Content, Sider } = Layout;
const { audience } = GetEnvironmentConfig().auth;

function App() {
	const navigate = useNavigate();
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const selectedKey = useLocation().pathname;

	const defaultMenuItems: ItemType<MenuItemType>[] = [
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
	];

	const loginMenuItem: ItemType<MenuItemType> = {
		key: 'login',
		icon: <EditOutlined />,
		label: 'Login',
		onClick: () => {
			loginWithRedirect({ authorizationParams: { audience } });
		}
	};

	const logoutMenuItem: ItemType<MenuItemType> = {
		key: 'logout',
		icon: <EditOutlined />,
		label: 'Logout',
		onClick: () => {
			logout();
		}
	};

	const [menuItems, setMenuItems] = useState<ItemType<MenuItemType>[]>(defaultMenuItems);

	useEffect(() => {
		const newMenuItems: ItemType<MenuItemType>[] = [...defaultMenuItems];

		if (isAuthenticated) newMenuItems.unshift(logoutMenuItem);
		if (!isAuthenticated) newMenuItems.unshift(loginMenuItem);

		setMenuItems(newMenuItems);
	}, [isAuthenticated]);

	return (
		<Layout style={{ height: '100vh' }}>
			<Sider trigger={null}>
				<Menu
					defaultSelectedKeys={['editor']}
					selectedKeys={highlight(selectedKey)}
					style={{ height: '100%', borderRight: 0 }}
					items={menuItems}
				/>
			</Sider>
			<Content>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/editor" element={<ModelEditor />} />
					<Route path="/designer" element={<ChartDesigner />} />
				</Routes>
			</Content>
		</Layout>
	);
}

const highlight = (selectedKey: string) => {
	switch (selectedKey) {
		case '/editor':
			return ['editor'];
		case '/designer':
			return ['designer'];
		default:
			return [];
	}
};

export default App;
