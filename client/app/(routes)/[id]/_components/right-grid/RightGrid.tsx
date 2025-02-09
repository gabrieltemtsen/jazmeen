import React from 'react';
import RowOne from './row-one/RowOne';
import ActivityIndicator from '@/app/_components/activity-indicator/ActivityIndicator';
import BuyAndSell from './buy-and-sell/BuyAndSell';
import FromCard from '@/app/_components/card/FromCard';
import ToCard from '@/app/_components/card/ToCard';

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
        </div >
    );
};

export default RightGrid;