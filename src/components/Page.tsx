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
        {this.props.children}
      </div>
    )
  }
}