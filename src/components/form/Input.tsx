import { Field } from "formik";
import { ComponentType, HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  name: string,
}
const Input: ComponentType<InputProps> = ({name, ...inputProps}) => {
  return <Field name={name} className="form-control" placeholder={name} {...inputProps} />
}

export default Input;
