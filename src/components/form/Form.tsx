import { ComponentType } from "react";
import { FormProvider, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import identity from 'ramda/src/identity';

export interface FormProps<FieldValues = {}> {
  onSubmit?: SubmitHandler<FieldValues>
}

interface FormMemoProps {
  form: UseFormReturn,
  onSubmit: SubmitHandler<{}>
}
const FormMemo: ComponentType<FormMemoProps> = (props) => {
  return (
    <FormProvider {...props.form} >
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  );
}
const Form: ComponentType<FormProps> = (props) => {
  const form = useForm();
  const onSubmit = props.onSubmit || identity;
  const children = props.children;

  return <FormMemo {...{form, onSubmit, children}} />;
}

export default Form;
