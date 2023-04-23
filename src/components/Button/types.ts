import { ComponentPropsWithoutRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  color?: string;
}

export interface ButtonUnobtrusiveProps extends ComponentPropsWithoutRef<'button'> {}
