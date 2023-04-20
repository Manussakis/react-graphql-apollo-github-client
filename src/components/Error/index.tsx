import { ErrorMessageProps } from "./types";

import "./style.css";

const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <div className="ErrorMessage">
    <small>{error.toString()}</small>
  </div>
);

export default ErrorMessage;
