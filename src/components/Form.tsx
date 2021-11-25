import classNames from "classnames";
import { Formik, FormikConfig, FormikValues, Form as FormikForm } from "formik";
import { ComponentType, HTMLProps, PropsWithChildren, Ref } from "react";

export type FormProps<Values extends FormikValues> = FormikConfig<Values> & PropsWithChildren<{
  FormEl?: ComponentType
  resetOnSubmit?: boolean
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
      onSubmit={(...args) => {
        props.onSubmit(...args);
        if (props.resetOnSubmit !== false) args[1].resetForm();
      }}
    >
      <FormEl>
        {props.children}
      </FormEl>
    </Formik>
  )
}