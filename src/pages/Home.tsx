import { Typography } from 'antd';

import { useAuth0 } from '@auth0/auth0-react';

export default function Homepage() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading User Profile...</div>;
	}

	if (isAuthenticated) {
		return (
			<div>
				<img src={user?.picture} alt={user?.name} />
				<br />
				<Typography.Text>{user?.name}</Typography.Text>
				<br />
				<Typography.Text>{user?.email}</Typography.Text>
			</div>
		);
	}

	return <h1>Error loading user profile.</h1>;
}
