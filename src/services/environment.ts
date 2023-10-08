export type EnvironmentConfig = {
	auth: AuthConfig;
};

export type AuthConfig = {
	audience: string;
	clientID: string;
	domain: string;
};

const envConfig: EnvironmentConfig = {
	auth: {
		audience: '',
		clientID: '',
		domain: ''
	}
};

export const GetEnvironmentConfig = (): EnvironmentConfig => {
	if (window.env?.auth) {
		const { audience = '', clientID = '', domain = '' } = window.env.auth;

		envConfig.auth = {
			audience,
			clientID,
			domain
		};
	}

	return envConfig;
};
