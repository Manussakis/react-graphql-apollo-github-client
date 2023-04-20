import { InputProps } from "./types";

import "./style.scss";

const Input = ({
  children,
  color = "black",
  type = "text",
  value,
  onChange,
}: InputProps) => (
  <input
    className={`Input Input_${color}`}
    type={type}
    value={value}
    onChange={onChange}
  >
    {children}
  </input>
);

export default Input;
