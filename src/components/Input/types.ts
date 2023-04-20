import { ChangeEvent, ReactNode } from "react";

export interface InputProps {
  children?: ReactNode;
  color: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
