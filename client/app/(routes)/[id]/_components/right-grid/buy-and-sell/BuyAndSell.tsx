import CustomButton from '@/app/_components/custom-button/CustomButton';
import { Button } from '@/components/ui/button';
import { LucideCopy } from 'lucide-react';
import React from 'react';

const BuyAndSell = () => {
    return (
        <div className="flex justify-between pr-20 mt-3">
            <div className="flex gap-8">
                <CustomButton label='Buy' className='bg-slate-500 hover:bg-slate-400 text-white px-4  h-8 rounded' />
                <CustomButton label='Sell' className='bg-transparent' />
            </div>
            <div className="">
                <Button>
                    <LucideCopy className="h-5 w-8 text-gray-400" />
                </Button>
            </div>
        </div>
    );
};

export default BuyAndSell;