import React from 'react';
import { act, fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LabeledInput from '../components/form/LabeledInput';
import RootProvider from '../components/RootProvider';
import Form from '../components/form/Form';
import SubmitButton from '../components/form/SubmitButton';

test('LabeledInput basics', async () => {
  const submitHook = jest.fn()
  const { container } = render(
    <RootProvider>
      <Form
        initialValues={{
          username: '',
        }}
        onSubmit={(values) => {
          submitHook(values)
          return {success: true, data: null};
        }}
      >
        <LabeledInput
          name="username"
          label="Username"
        >
          Test label
        </LabeledInput>
        <SubmitButton />
      </Form>
    </RootProvider>
  );
  const input = container.querySelector('input');
  const label = container.querySelector('label');
  const submit = container.querySelector('button');
  expect(input).toHaveAttribute('name', 'username');
  expect(label).toHaveTextContent('Username');
  expect(submit).toBeTruthy();
  expect(submit).toHaveProperty('click');
  expect(input).toBeTruthy();
  userEvent.type(input!, 'Diana');
  await act(async () => fireEvent.click(submit!))
  expect(submitHook).toBeCalledWith({username: 'Diana'});
})