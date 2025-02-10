import React from 'react';
import RowOne from './row-one/RowOne';
import ActivityIndicator from '@/app/_components/activity-indicator/ActivityIndicator';
import BuyAndSell from './buy-and-sell/BuyAndSell';
import FromCard from '@/app/_components/card/FromCard';
import ToCard from '@/app/_components/card/ToCard';
import CustomButton from '@/app/_components/custom-button/CustomButton';

const RightGrid = () => {
    return (
        <div className='flex flex-col'>
            <RowOne />
            <div className="">
                <ActivityIndicator className='t border-none m-0 -ml-2' />
            </div>
            <BuyAndSell />
            <FromCard />
            <ToCard />
            <CustomButton label='Connect Wallet' className='w-full mt-3' />
        </div >
    );
};

export default RightGrid;