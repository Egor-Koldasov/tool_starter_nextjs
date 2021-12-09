import classNames from "classnames";
import { Formik, FormikConfig, FormikValues, Form as FormikForm, FormikHelpers } from "formik";
import { ComponentType, HTMLProps, PropsWithChildren, Ref } from "react";
import { Promisable } from "type-fest";
import { Data, QueryHookResult } from "../../lib/modules/query";

export type FormProps<Values extends FormikValues> = Omit<FormikConfig<Values>, 'onSubmit'> & PropsWithChildren<{
  FormEl?: ComponentType
  resetOnSubmit?: boolean
  onSubmit: (values: Values, helpers: FormikHelpers<Values>) => Promisable<QueryHookResult<Data>>
}>


export type DefaultFormProps = HTMLProps<HTMLFormElement> & PropsWithChildren<{
  ref?: Ref<HTMLFormElement>
}>
export const DefaultForm = (props: DefaultFormProps) => (
  <FormikForm {...props} className={classNames("container py-3", props.className)} />
);

export default function Form<Values>(props: FormProps<Values>) {
  const FormEl = props.FormEl || DefaultForm;
  return (
    <Formik
      {...props}
      onSubmit={async (...args) => {
        const res = await props.onSubmit(...args);
        if (res.success && props.resetOnSubmit !== false) args[1].resetForm();
      }}
    >
      <FormEl>
        {props.children}
      </FormEl>
    </Formik>
  )
}