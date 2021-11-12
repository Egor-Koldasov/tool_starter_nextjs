import classNames from "classnames";

interface SubmitButtonProps {
  loading?: boolean
}
const SubmitButton = (props: SubmitButtonProps) => (
  <button type="submit" className={classNames("btn btn-primary", {loading: props.loading})}>Submit</button>
)

export default SubmitButton;
