import Page from '../components/Page';
import { Fragment, memo } from 'react';
import { Field, Form, Formik, useField } from 'formik';
import loginState from '../state/modules/login';

const EmailValue = memo(() => {
  const [input] = useField('email');
  console.log('email value render')
  const emailValue = input.value;
  return <div>{emailValue}</div>
})
const Email = () => {
  console.log('email box render')
  return (
    <Fragment>
      <EmailValue />
      <Field type="text" name="email" />
    </Fragment>
  )
}
const Password = () => {
  console.log('password render')
  return (
    <Field type="text" name="password" />
  )
}
export default function Login() {
  return (
    <Page>
      <Formik
        initialValues={loginState}
        onSubmit={console.log}
      >
        <Form>
          <Email />
          <Password />
        </Form>
      </Formik>
    </Page>
  )
}

