import { Component } from "react";
import { Link } from "@tanstack/react-router";
import { usePizzaofTheDay } from "./usePizzaofTheDay";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oh no, something went wrong.</h2>
          <p>
            Please try again later. <Link to="/"> Click here</Link> to go back
            to the home page.
          </p>
        </div>
      );
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
