import { ComponentType } from "react";
import { FormState, useFormContext, UseFormRegisterReturn } from "react-hook-form";

export interface InputByPropsProps {
  regProps: UseFormRegisterReturn
  formState: FormState<{}>
}
const InputByProps: ComponentType<InputByPropsProps> = (props) => {
  console.log(`${props.regProps.name} input by props render`)
  return (
    <input
      type="text"
      {...props.regProps}
    />
  )
}

export interface InputProps {
  name: string,
}
const Input: ComponentType<InputProps> = (props) => {
  const form = useFormContext();
  console.log(`${props.name} input render`)
  return <InputByProps regProps={form.register(props.name)} formState={form.formState} />
}

export default Input;
