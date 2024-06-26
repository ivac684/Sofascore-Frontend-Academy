import { ReactNode } from "react";

export interface ButtonProps {
    iconSrc?: string;
    altText?: string;
    width?: number;
    height?: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
  }