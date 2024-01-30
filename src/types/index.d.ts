import { EnvironmentConfig } from '../services/Environment';

export {};

declare global {
	interface Window {
		env: EnvironmentConfig | undefined;
	}
}
