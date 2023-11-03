import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetEnvironmentConfig } from '../services/Environment';
import { ThunkExtra } from '../store/wrappers';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: GetEnvironmentConfig().api.backend,
		// @ts-ignore: Typescript doesn't know that the extra's type here is ThunkExtra, but we do
		prepareHeaders: async (headers, { extra }: { extra: ThunkExtra }) => {
			let accessToken: string;
			try {
				accessToken = await extra.authClient.getTokenSilently();
			} catch (err) {
				return headers;
			}

			headers.set('Authorization', `Bearer ${accessToken}`);

			return headers;
		}
	}),
	endpoints: () => ({})
});
