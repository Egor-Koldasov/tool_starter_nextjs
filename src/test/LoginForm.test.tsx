import React from 'react';
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginForm from '../components/login/LoginForm';
import LabeledInput from '../components/form/LabeledInput';
import SubmitButton from '../components/form/SubmitButton';
import RootProvider from '../components/RootProvider';
import { querySelectorRequire } from './lib/querySelectorRequire';

describe('LoginForm', () => {
  let email: HTMLInputElement;
  let password: HTMLInputElement;
  let submit: HTMLButtonElement;
  beforeEach(() => {
    render(
      <RootProvider>
        <LoginForm>
          <LabeledInput name="email" label="Email" />
          <LabeledInput name="password" label="Password" />
          <SubmitButton />
        </LoginForm>
      </RootProvider>
    );
    email = querySelectorRequire<HTMLInputElement>('input[name="email"]');
    password = querySelectorRequire<HTMLInputElement>('input[name="password"]');
    submit = querySelectorRequire('button');
  })

  test(`empty fields`, async () => {
    await act(async () => submit.click());
    screen.getByText('email is a required field');
    screen.getByText('password is a required field');
  });

  test(`invalid email`, async () => {
    userEvent.type(email, 'invalid@test')
    await act(async () => email.blur())
    screen.getByText('email must be a valid email');
  });

  test.todo('invalid password');

  test('valid input', async () => {
    userEvent.type(email, 'valid@test.com')
    userEvent.type(password, 'validpassword')
    await act(async () => submit.click());
    const errors = document.querySelectorAll('.invalid-feedback');
    expect(errors.length).toBe(0)
  })
})