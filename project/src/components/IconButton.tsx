import { ButtonProps } from '@/types/ButtonProps'
import React from 'react'

const IconButton = ({ iconSrc, altText, width, height, onClick, className, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      disabled={disabled} 
      {...props}
      style={{ backgroundColor: 'transparent', border: 'none',  cursor: disabled ? 'default' : 'pointer'}}
    >
      <img src={iconSrc} width={width} height={height} alt={altText} />
    </button>
  )
}

export default IconButton;