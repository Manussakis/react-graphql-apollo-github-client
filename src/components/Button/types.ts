import { ReactNode } from "react";

interface RawButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void
}

export interface ButtonProps extends RawButtonProps {
  color?: string;
}

export interface ButtonUnobtrusiveProps extends RawButtonProps{}
