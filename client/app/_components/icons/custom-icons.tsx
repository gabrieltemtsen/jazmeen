import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface IconProps {
  Icon: React.ComponentType<any>;
  isButton?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'xs'| 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  style?: React.CSSProperties;
}

const CustomIcon = ({ Icon, isButton, onClick, disabled, size = 'sm', className, style, ...props }: IconProps) => {
  const sizeClassName = {
    xs: 'h-3 w-3',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-14 w-14',
    '2xl': 'h-16 w-16',
  };

  return (
    <>
      {isButton ? (
        <Button
          variant={'ghost'}
          onClick={onClick}
          disabled={disabled}
          type="button"
          className="hover:text-gray-600 hover:bg-transparent text-primary"
        >
          {Icon ? (
            <Icon className={className} {...props} style={style} />
          ) : (
            <div>Nill</div>
          )}
        </Button>
      ) : (
        <div>
          {Icon ? (
            <Icon className={cn("", className, size && sizeClassName[size])} style={style} {...props} />
          ) : (
            <div>Nill</div>
          )}
        </div>
      )}
    </>
  );
};

export default CustomIcon;
