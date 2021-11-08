import Page from '../components/Page';
import { Fragment, memo, useContext, useEffect } from 'react';
import { Form, Formik, FormikContext, useField } from 'formik';
import loginInit, { useUpdateLogin } from '../state/modules/login';
import { useSelector } from '../state/state-update';
import { createContext, useContextSelector } from 'use-context-selector';
import { formikSyncContext } from '../state/formik-sync';
import FormikSyncProvider from '../components/FormikSyncProvider';

const EmailValue = memo(() => {
  console.log('email value render')
  const emailValue = useSelector(([state]) => state.login.email);
  return <div>{emailValue}</div>
})
const Email = () => {
  const handleChange = useContextSelector(formikSyncContext, ([formik]) => {
    return formik.handleChange
  });
  const value = useContextSelector(formikSyncContext, ([formik]) => formik.values.email);
  const onChange = handleChange('email');
  // const [emailInput] = useField('email');
  console.log('email box render', value, onChange)
  return (
    <Fragment>
      <EmailValue />
      <input
        type="text"
        {...{value, onChange}}
      />
    </Fragment>
  )
}
const Password = () => {
  console.log('password render')
  const handleChange = useContextSelector(formikSyncContext, ([formik]) => {
    return formik.handleChange
  });
  const value = useContextSelector(formikSyncContext, ([formik]) => formik.values.password);
  const onChange = handleChange('password');

  // const [passwordInput] = useField('password');
  return (
    <input
      type="text"
      {...{value, onChange}}
    />
  )
}

export default function Login() {
  return (
    <Page>
      <Formik
        initialValues={loginInit}
        onSubmit={console.log}
      >
        <FormikSyncProvider>
          <Form>
            <Email />
            <Password />
          </Form>
        </FormikSyncProvider>
      </Formik>
    </Page>
  )
}

