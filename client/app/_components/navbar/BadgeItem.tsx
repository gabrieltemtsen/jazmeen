import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BadgeItemProps {
    icon: React.ReactElement;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ icon, label, isActive, onClick }) => {
    return (
        <div onClick={onClick} className="text-gray-300 hover:text-white">
            <div className="flex gap-3 cursor-pointer">
                <Badge variant={isActive ? 'outline' : 'secondary'}>
                    {React.cloneElement(icon, { className: 'h-4 w-4 m-1' })}
                    <span className='mr-1'>{label}</span>
                </Badge>
            </div>
        </div>
    );
};

export default BadgeItem;