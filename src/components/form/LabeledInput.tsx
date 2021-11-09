import { ComponentType, HTMLProps } from "react";
import capitalize from "../../lib/data/capitalize";
import Input from "./Input";
import Label from "./Label";

interface LabeledInputProps {
  inputProps?: HTMLProps<HTMLInputElement>
  labelProps?: HTMLProps<HTMLLabelElement>
  label?: string
  name: string
}

const LabeledInput: ComponentType<LabeledInputProps> = (props) => (
  <div className="form-floating mb-3">
    <Input name={props.name} />
    <Label>{props.label || capitalize(props.name)}</Label>
  </div>
);

export default LabeledInput;
