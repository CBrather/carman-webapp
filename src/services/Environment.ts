export type EnvironmentConfig = {
	api: APIConfig;
	auth: AuthConfig;
};

export type APIConfig = {
	backend: string;
};

export type AuthConfig = {
	audience: string;
	clientID: string;
	domain: string;
};

const envConfig: EnvironmentConfig = {
	api: {
		backend: ''
	},
	auth: {
		audience: '',
		clientID: '',
		domain: ''
	}
};

export const GetEnvironmentConfig = (): EnvironmentConfig => {
	if (!window.env) return envConfig;

	const { api, auth } = window.env;

	if (api) {
		const { backend = '' } = api;

		envConfig.api.backend = backend;
	}

	if (auth) {
		const { audience = '', clientID = '', domain = '' } = window.env.auth;

		envConfig.auth = {
			audience,
			clientID,
			domain
		};
	}

	return envConfig;
};
