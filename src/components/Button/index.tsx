import { ButtonProps, ButtonUnobtrusiveProps } from "./types";
import "./styles.scss";

const Button = ({
  children,
  className,
  color = "black",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    className={`${className} Button Button_${color}`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

const ButtonUnobtrusive = ({
  children,
  className,
  type = "button",
  onClick,
}: ButtonUnobtrusiveProps) => (
  <button
    className={`${className} Button_unobtrusive`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
export { ButtonUnobtrusive };
