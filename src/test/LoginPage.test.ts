import { act, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getPage } from 'next-page-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { querySelectorRequire } from './lib/querySelectorRequire';
import userEvent from '@testing-library/user-event';
import { loginError, loginSuccess, meNull, meSuccess } from './lib/mock/api/user';

jest.mock('axios/lib/defaults', () => require('./lib/mock/axiosDefaults').default)
const mockAxios = new MockAdapter(axios);

describe(`Login page`, () => {
  let email: HTMLInputElement;
  let password: HTMLInputElement;
  let submit: HTMLButtonElement;
  beforeEach(async () => {
    meNull(mockAxios);
    const { render } = await getPage({ route: '/login' });
    render();

    email = querySelectorRequire<HTMLInputElement>('input[name="email"]');
    password = querySelectorRequire<HTMLInputElement>('input[name="password"]');
    submit = querySelectorRequire('button[type="submit"]');
  });

  test(`empty fields`, async () => {
    loginSuccess(mockAxios)
    await act(async () => userEvent.click(submit));
    await waitFor(() => screen.getByText('email is a required field'));
    screen.getByText('password is a required field');
  });

  test(`invalid email`, async () => {
    loginSuccess(mockAxios)
    userEvent.type(email, 'invalid@test')
    await act(async () => email.blur())
    screen.getByText('email must be a valid email');
  });

  test.todo('invalid password');

  test('valid input', async () => {
    loginSuccess(mockAxios, {id: 1, email: 'valid@test.com'});
    meSuccess(mockAxios, {id: 1, email: 'valid@test.com'});
    userEvent.type(email, 'valid@test.com')
    userEvent.type(password, 'validpassword')
    await act(async () => submit.click());
    const errors = document.querySelectorAll('.invalid-feedback');
    expect(errors.length).toBe(0)
    await waitFor(() => screen.getByText(`You are entered as valid@test.com`));
  })

  test('server error', async () => {
    loginError(mockAxios, 'This email is already in use');
    userEvent.type(email, 'valid@test.com')
    userEvent.type(password, 'validpassword')
    await act(async () => submit.click());
    await waitFor(() => screen.getByText(`This email is already in use`));
  });
});