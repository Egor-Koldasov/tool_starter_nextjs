import { ReactNode } from "react";
import styled from "styled-components";
import { parentHeight } from "../../lib/styles/parentHeight";
import Navigation, { NavigationStyled } from "./Navigation";

interface PageStyles {
  fixedHeight: boolean
}

const PageContent = styled.div`
  
`

const PageDiv = styled.div<PageStyles>`
  ${(props) => props.fixedHeight && (`
    height: 100%;
    ${parentHeight()}
    ${NavigationStyled} {
      flex: 0;
    }
    ${PageContent} {
      ${parentHeight()}
    }
  `)}
`

interface PageProps {
  children: ReactNode
  styles?: PageStyles
}

export const defaultPageStyles: PageStyles = {
  fixedHeight: true,
}
export default function Page(props: PageProps) {
  const pageStyles = {...defaultPageStyles, ...(props.styles || {})};
  return (
    <PageDiv {...pageStyles}>
      <Navigation />
      <PageContent>{props.children}</PageContent>
    </PageDiv>
  )
}