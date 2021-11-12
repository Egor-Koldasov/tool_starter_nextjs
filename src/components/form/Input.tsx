import classNames from "classnames";
import { Field, useField } from "formik";
import { ComponentType, HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  name: string,
}
const Input: ComponentType<InputProps> = ({name, ...inputProps}) => {
  const [,meta] = useField(name);
  const isInvalid = meta.touched && meta.error;
  const isValid = meta.touched && !meta.error;
  return (
    <Field
      name={name}
      className={classNames("form-control", {'is-invalid': isInvalid, 'is-valid': isValid})}
      placeholder={name}
      {...inputProps}
    />
  )
}

export default Input;
