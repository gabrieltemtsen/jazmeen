import React from 'react';
import RightGrid from './_components/right-grid/RightGrid';
import { TradingViewWidget } from './_components/left-grid/trading-view/TradingView';

interface UserProps {
    params: Promise<{
        id: string;
    }>;
}
const User = async ({ params }: UserProps) => {

    const { id } = await params;
    console.log(id);
    return (
        <div className="border-gray-700 rounded p-4">
            <div className="grid grid-cols-12 gap-4 ">
                <div className="col-span-12 xl:col-span-8 rounded-lg">
                    <TradingViewWidget />
                </div>
                <div className="col-span-12 xl:col-span-4   rounded-lg order-first md:order-none">
                    <RightGrid />
                </div>
            </div>
        </div>
    );
};

export default User;