import { ComponentType, HTMLProps } from "react";
import capitalize from "../../lib/data/capitalize";
import Input from "./Input";
import InputError from "./InputError";
import Label from "./Label";

interface LabeledInputProps {
  inputProps?: HTMLProps<HTMLInputElement>
  labelProps?: HTMLProps<HTMLLabelElement>
  label?: string
  name: string
}

const LabeledInput: ComponentType<LabeledInputProps> = (props) => {
  return (
    <div className="mb-3">
      <div className="form-floating mb-1">
        <Input name={props.name} {...props.inputProps} />
        <Label {...props.labelProps}>{props.label || capitalize(props.name)}</Label>
      </div>
      <InputError name={props.name} />
    </div>
  );
}

export default LabeledInput;
