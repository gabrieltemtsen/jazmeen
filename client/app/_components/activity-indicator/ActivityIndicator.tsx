import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import React from 'react';

interface ActivityIndicatorProps{
    className?: string;
    image?: string;
    symbol?: string;
}
const ActivityIndicator = ({className, image, symbol}: ActivityIndicatorProps) => {
    return (
        <div className={cn("col-span-8 border-t border-t-gray-500 p-4 -mt-4 rounded-lg", className)}>
            <div className="flex gap-3 -mt-2 -mb-2">
                <div className="">
                    <Avatar className='h-6 w-6 mt-2'>
                        <AvatarImage src={image} alt="@shadcn" />
                        <AvatarFallback className='text-gray-400'>Jzn</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col items-center">
                    <span className='text-sm text-gray-100'>Jazmeen:${symbol}</span>
                    <div className="flex gap-3">
                        <div className="flex gap-1 items-center">
                            <Zap className='h-3 w-3 text-green-300' />
                            <span className='text-gray-500 text-xs'>1</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className='text-gray-500 text-xs'>3</span>
                            <div className="text-gray-500 text-xs">Recast</div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className='text-gray-500 text-xs'>3</span>
                            <div className="text-gray-500 text-xs">Likes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityIndicator;