import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import React from 'react';
import { FaEthereum } from "react-icons/fa";

const FromCard = () => {
    return (
        <Card className='border border-gray-700 rounded-2xl p-5 mt-4'>
            <div className="flex flex-col">
                <div className="mb-4 text-2xl text-white">From</div>
                <div className="">
                    <div className="flex justify-between">
                        <div className="text-lg text-gray-300">0.00</div>
                        <div className="flex items-center text-gray-400">
                            <FaEthereum />
                            <Badge variant='outline'>
                                <span className='mr-1'>ETH</span>
                            </Badge>
                        </div>
                    </div>
                    <Separator className='bg-gray-600 h-[1px] mt-2 w-full' />
                </div>
                <div className="flex gap-4 mt-3 text-gray-400">
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                </div>
            </div>
        </Card>
    );
};

export default FromCard;