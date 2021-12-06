import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getPage } from 'next-page-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

jest.mock('axios/lib/defaults', () => require('./lib/mock/axiosDefaults').default)
// jest.mock('next/router', () => require('next-router-mock'))
const mockAxios = new MockAdapter(axios);

mockAxios.onGet().reply(200, JSON.stringify({
  user: {
    email: 'user@email.com',
    id: '4212'
  },
}));

describe(`Document`, () => {
  beforeEach(async () => {
    const { render } = await getPage({ route: '/profile' });
    render();
  });

  test('Rendered', async () => {
    screen.debug();
  })
});