import { PropsWithChildren } from "react";
import RootProvider from "../../components/RootProvider";

export default function TestBox(props: PropsWithChildren<{}>) {
  return (
    <RootProvider>
      {props.children}
    </RootProvider>
  )
}