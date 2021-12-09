import { act, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getPage } from 'next-page-tester';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { querySelectorRequire } from './lib/querySelectorRequire';
import userEvent from '@testing-library/user-event';
import { meNull, meSuccess, signupError, signupSuccess } from './lib/mock/api/user';

jest.mock('axios/lib/defaults', () => require('./lib/mock/axiosDefaults').default)
const mockAxios = new MockAdapter(axios);

describe(`Signup page`, () => {
  let email: HTMLInputElement;
  let password: HTMLInputElement;
  let confirmPassword: HTMLInputElement;
  let submit: HTMLButtonElement;
  beforeEach(async () => {
    meNull(mockAxios);
    const { render } = await getPage({ route: '/signup' });
    render();

    email = querySelectorRequire<HTMLInputElement>('input[name="email"]');
    password = querySelectorRequire<HTMLInputElement>('input[name="password"]');
    confirmPassword = querySelectorRequire<HTMLInputElement>('input[name="confirmPassword"]');
    submit = querySelectorRequire('button[type="submit"]');
  });

  test(`empty fields`, async () => {
    signupSuccess(mockAxios);
    await act(async () => userEvent.click(submit));
    await waitFor(() => screen.getByText('email is a required field'));
    screen.getByText('password is a required field');
  });

  test(`invalid email`, async () => {
    signupSuccess(mockAxios);
    userEvent.type(email, 'invalid@test')
    await act(async () => email.blur())
    screen.getByText('email must be a valid email');
  });

  test(`passwords do not match`, async () => {
    signupSuccess(mockAxios);
    userEvent.type(email, 'valid@test.com')
    userEvent.type(password, 'validpassword');
    userEvent.type(confirmPassword, 'validpasswprd');
    await act(async () => userEvent.click(email))
    screen.getByText('Passwords should match');
  })

  test.todo('invalid password');

  test('valid input', async () => {
    signupSuccess(mockAxios, {id: 1, email: 'valid@test.com'});
    meSuccess(mockAxios, {id: 1, email: 'valid@test.com'});
    userEvent.type(email, 'valid@test.com')
    userEvent.type(password, 'validpassword')
    userEvent.type(confirmPassword, 'validpassword')
    await act(async () => submit.click());
    const errors = document.querySelectorAll('.invalid-feedback');
    expect(errors.length).toBe(0)
    await waitFor(() => screen.getByText(`You are entered as valid@test.com`));
  })

  test('server error', async () => {
    signupError(mockAxios, 'This email is already in use');
    userEvent.type(email, 'valid@test.com')
    userEvent.type(password, 'validpassword')
    userEvent.type(confirmPassword, 'validpassword')
    await act(async () => submit.click());
    await waitFor(() => screen.getByText(`This email is already in use`));
  });
});