```
import { post } from '@bge-website/api';
import { getJWTToken, getRefreshToken, getUserRef, isTokenExpired, saveJWTToken } from '@bge-website/utils-token';

export interface User {
	username: string;
	password: string;
}

export const submitLogin = (user: User, apiKey: string): Promise<Response> => {
	return post('/api/auth/token', user, { 'X-API-Key': apiKey });
};

export const submitMybgeAdminLogin = (mybgeToken: string): Promise<Response> => {
	return post('/api/user/admin', { temporaryToken: mybgeToken });
};

export const submitRefreshToken = (currentRefreshToken: string | null): Promise<Response> => {
	return post('/api/auth/refresh-token', {
		refreshToken: currentRefreshToken,
	});
};
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
export const refreshToken = (): Promise<any> => {
	const currentRefreshToken = getRefreshToken();
	return new Promise((resolve, reject) => {
		if (!currentRefreshToken) {
			reject('no refresh token in local storage');
		}
		submitRefreshToken(currentRefreshToken)
			.then((response: any) => {
				if (response.status === 200) {
					return response.json();
				} else {
					reject('Error with token refresh');
					return;
				}
			})
			.then((result) => {
				saveJWTToken(result);
				resolve(result);
				return;
			})
			.catch(() => {
				reject('Error with token refresh');
			});
	});
};

export const getAccessToken = (): Promise<string | undefined> => {
	return new Promise((resolve) => {
		const accessToken = getJWTToken();
		if (!accessToken) {
			resolve(undefined);
			return;
		}
		isTokenExpired()
			.then((expired) => {
				if (expired) {
					return refreshToken();
				} else {
					resolve(accessToken);
					return;
				}
			})
			.then((value) => {
				if (value) {
					resolve(value.accessToken);
				}
				return;
			})
			.catch(() => {
				resolve(undefined);
			});
	});
};

export const getUserReference = (): Promise<string | undefined> => {
	return new Promise((resolve) => {
		const userReference = getUserRef();
		if (!userReference) {
			resolve(undefined);
			return;
		}
		isTokenExpired()
			.then((expired) => {
				if (expired) {
					return refreshToken();
				} else {
					resolve(userReference);
					return;
				}
			})
			.then((value) => {
				if (value) {
					resolve(value.ref);
				}
				return;
			})
			.catch(() => {
				resolve(undefined);
			});
	});
};
