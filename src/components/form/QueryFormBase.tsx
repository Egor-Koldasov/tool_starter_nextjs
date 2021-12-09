import { ComponentType, ReactNode } from "react";
import { getErrorMessage, QueryPath } from "../../lib/modules/query";
import { useSelectorPath } from "../../state/useSelector";
import { DefaultForm } from "./Form";
import SubmitButton from "./SubmitButton";

export type QueryFormBaseProps = {
  queryPath: QueryPath
  title?: string
  Form?: ComponentType
  children?: ReactNode
  submitLabel?: string
}

export default function QueryFormBase(props: QueryFormBaseProps) {
  const loading = useSelectorPath(`${props.queryPath}.loading`);
  const error = getErrorMessage(useSelectorPath(`${props.queryPath}.error`));
  const Form = props.Form || DefaultForm;
  return (
    <Form>
      {props.title && <h1 className="pb-3">{props.title}</h1>}
      {props.children}
      {error && <div className="invalid-feedback d-flex pb-2">{String(error)}</div>}
      <SubmitButton loading={loading} label={props.submitLabel} />
    </Form>
  )
}