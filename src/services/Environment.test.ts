import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { GetEnvironmentConfig, EnvironmentConfig } from './Environment';

describe('GetEnvironment Config', () => {
	let originalWindowEnv: EnvironmentConfig | undefined;

	beforeAll(() => {
		originalWindowEnv = window.env;
	});

	afterAll(() => {
		window.env = originalWindowEnv;
	});

	it('Should return default values if window.env is not set', () => {
		const result = GetEnvironmentConfig();

		const expected: EnvironmentConfig = {
			api: { backend: '' },
			auth: { audience: '', clientID: '', domain: '' }
		};

		expect(result).toEqual(expected);
	});

	it('Should return values set on window.env', () => {
		window.env = {
			api: { backend: 'testBackend' },
			auth: { audience: 'testAudience', clientID: 'testClientID', domain: 'testDomain' }
		};

		const result = GetEnvironmentConfig();

		const expected: EnvironmentConfig = {
			api: { backend: 'testBackend' },
			auth: { audience: 'testAudience', clientID: 'testClientID', domain: 'testDomain' }
		};

		expect(result).toEqual(expected);
	});
});
