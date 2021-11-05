import { Component, ReactElement } from "react";
import Navigation from "./Navigation";

interface PageProps {
  children: ReactElement
}
export default class Page extends Component<PageProps> {
  render() {
    return (
      <div className="page">
        <Navigation />
        {this.props.children}
      </div>
    )
  }
}