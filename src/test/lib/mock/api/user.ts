import MockAdapter from "axios-mock-adapter/types";
import { User } from "../../../../state/modules/api/me";

export const meNull = (mockAxios: MockAdapter) => mockAxios.onGet().reply(200, JSON.stringify({user: null}));
export const meSuccess = (mockAxios: MockAdapter, user: User = defaultTestUser) => mockAxios.onGet().reply(200, JSON.stringify({user}));

export const defaultTestUser = {id: 1, email: 'user@test.com'};
export const loginSuccess = (mockAxios: MockAdapter, user: User = defaultTestUser) => mockAxios.onPost().reply(200, JSON.stringify({user}))
export const loginError = (mockAxios: MockAdapter, error: string) => mockAxios.onPost().reply(400, JSON.stringify({message: error}))
