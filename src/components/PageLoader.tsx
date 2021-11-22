import { ComponentType, useEffect, useState } from "react";
import { PageProps } from "../pages/_app";
import { useUpdateRootState } from "../state/state-update";

export interface PageLoaderProps {
  pageProps: PageProps,
  Component: ComponentType<PageProps>
}

export default function PageLoader(props: PageLoaderProps) {
  const [ActiveComponent, setActiveComponent] = useState<ComponentType<PageProps>>(() => props.Component);
  const updateRootState = useUpdateRootState();
  useEffect(() => {
    if (ActiveComponent !== props.Component) {
      console.log('effect', props.pageProps.initState)
      if (props.pageProps.initState) updateRootState(props.pageProps.initState);
      setActiveComponent(() => props.Component);
    }
  }, [ActiveComponent, setActiveComponent, props.Component]);
  return (
    <ActiveComponent {...props.pageProps} />
  )
}