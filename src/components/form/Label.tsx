import { ComponentType, HTMLProps } from "react"

interface LabelProps extends HTMLProps<HTMLLabelElement> {

}
const Label: ComponentType<LabelProps> = (props) => <label className="" {...props}></label>

export default Label