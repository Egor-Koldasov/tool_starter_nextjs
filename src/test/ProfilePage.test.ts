import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { getPage } from 'next-page-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { meNull, meSuccess } from './lib/mock/api/user';
import { NextRouter, useRouter } from 'next/router';

jest.mock('axios/lib/defaults', () => require('./lib/mock/axiosDefaults').default);
const mockAxios = new MockAdapter(axios);

describe(`Profile page`, () => {
  test('succesful authentication', async () => {
    meSuccess(mockAxios, {id: 1, email: 'success@test.com'});
    const { render } = await getPage({ route: '/profile' });
    render();
    await waitFor(() => screen.getByText('You are entered as success@test.com'))

  });

  test('unathenticated access', async () => {
    meNull(mockAxios);
    let router: NextRouter;
    const { render } = await getPage({ route: '/profile', router: (r) => router = r, });
    render();
    await waitFor(() => expect(router).toHaveProperty('pathname', '/login'));
  });
});
