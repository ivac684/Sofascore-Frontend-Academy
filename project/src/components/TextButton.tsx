import { Button } from '@kuma-ui/core';
import React, { useState } from 'react';
import { ButtonProps } from '@/types/ButtonProps';

const TextButton = ({ iconSrc, altText, width, height, onClick, className, children, ...props }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      backgroundColor= "var(--surface-1)"
      border='none'
      color='var(--primary-default)'
      display='flex'
      flexDirection='row'
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ 
        textDecoration: 'none', 
        position: 'relative', 
      }} 
      {...props}
    >
      {children}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '2px', 
            backgroundColor: 'var(--primary-default)'
          }}
        />
      )}
    </Button>
  );
}

export default TextButton;
