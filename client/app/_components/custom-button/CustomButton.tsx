import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CustomButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, className, onClick, disabled }) => {
  return (
    <div>
      <Button
        onClick={onClick}
        disabled={disabled}
        className={cn("hidden md:block bg-slate-500 hover:bg-slate-400 text-white px-4 h-8 rounded", className)}
      >
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;
