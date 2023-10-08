import { EnvironmentConfig } from '../services/environment';

export {};

declare global {
	interface Window {
		env: EnvironmentConfig;
	}
}
