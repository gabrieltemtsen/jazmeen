import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import React from 'react';
import { FaEthereum } from "react-icons/fa";

const ToCard = () => {
    return (
        <Card className='border border-gray-700 rounded-2xl p-5 mt-4'>
            <div className="flex flex-col">
                <div className="mb-4 text-xl text-white">To</div>
                <div className="">
                    <div className="flex justify-between">
                        <div className="text-2xl text-gray-300 font-semibold">0.00</div>
                        <div className="flex items-center text-gray-400">
                            <FaEthereum />
                            <Badge variant='outline'>
                                <span className='mr-1'>ETH</span>
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ToCard;