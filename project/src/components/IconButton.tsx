import { IconButtonProps } from '@/types/IconButtonProps'
import React from 'react'

const IconButton = ({ iconSrc, altText, width, height, onClick, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      {...props}
      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <img src={iconSrc} width={width} height={height} alt={altText} />
    </button>
  )
}

export default IconButton
