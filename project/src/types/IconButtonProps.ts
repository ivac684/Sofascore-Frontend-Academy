export interface IconButtonProps {
    iconSrc: string;
    altText: string;
    width?: number;
    height?: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    className?: string;
  }