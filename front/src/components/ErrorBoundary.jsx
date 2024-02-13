import React from "react";

import SNAlert from "./atoms/alert/SNAlert";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <SNAlert message="Something went wrong" severity={"error"}/>;
    }

    return this.props.children;
  }
}
