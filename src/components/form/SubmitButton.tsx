import classNames from "classnames";

interface SubmitButtonProps {
  loading?: boolean
  label?: string
}
const SubmitButton = (props: SubmitButtonProps) => {
  const label = props.label || 'Submit';
  return (
    <button
      type="submit"
      className={classNames("btn btn-primary", {loading: props.loading})}
    >
      {label}
    </button>
  )
}

export default SubmitButton;
