import { Component, ReactNode } from "react";
import Navigation from "./Navigation";

interface PageProps {
  children: ReactNode
}
export default class Page extends Component<PageProps> {
  render() {
    return (
      <div className="page">
        <Navigation />
        <div>{this.props.children}</div>
      </div>
    )
  }
}