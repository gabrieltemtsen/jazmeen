import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface CustomButtonProps {
    label: string;
    className?: string;
}

const CustomButton = ({ label, className }: CustomButtonProps) => {
    return (
        <div>
            <Button className={cn("hidden md:block bg-slate-500 hover:bg-slate-400 text-white px-4  h-8 rounded", className)}>{label}</Button>
        </div>
    );
};

export default CustomButton;