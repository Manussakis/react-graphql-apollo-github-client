import { ButtonProps, ButtonUnobtrusiveProps } from "./types";
import "./styles.scss";

const Button = ({
  children,
  className,
  color = "black",
  ...props
}: ButtonProps) => (
  <button
    className={`${className} Button Button_${color}`}
    {...props}
  >
    {children}
  </button>
);

const ButtonUnobtrusive = ({
  children,
  className,
  ...props
}: ButtonUnobtrusiveProps) => (
  <button
    className={`${className} Button_unobtrusive`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
export { ButtonUnobtrusive };
