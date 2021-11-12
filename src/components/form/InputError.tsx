import { useField } from "formik";

interface InputErrorProps {
  name: string,
}

const InputError = (props: InputErrorProps) => {
  const [,meta] = useField(props.name);
  if (!meta.touched || !meta.error) return null
  return (
    <div className="invalid-feedback d-flex">{meta.error}</div>
  )
}

export default InputError;