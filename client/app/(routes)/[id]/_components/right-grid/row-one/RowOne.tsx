import { cardBgImage } from '@/constants/ImageExport';
import { CircleDollarSign, GalleryHorizontalEnd, Zap } from 'lucide-react';
import React from 'react';

const RowOne = () => {
    return (
        <div className='flex gap-3'>
            <div style={{ backgroundImage: `url(${cardBgImage})` }} className="col-span-4 bg-cover bg-no-repeat row-span-2 h-28 w-24  p-4 rounded-lg"  >
            </div>
            <div className="flex flex-col justify-between">
                <div className="">
                    <div className="text-sm text-purple-400">
                        $Tochi
                    </div>
                    <div className="mt-1 text-xl text-gray-300">
                        TOCHI
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-2 items-center ">
                        <CircleDollarSign className='h-4 w-4 text-cyan-400 ' />
                        <span className='text-gray-400'>
                            $12.23m
                        </span>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <Zap className='h-4 w-4 text-green-400 ' />
                        <span className=' text-green-400'>
                            $12.23m
                        </span>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <GalleryHorizontalEnd className='h-4 w-4 text-pink-500' />
                        <span className=' text-pink-500'>
                            $12.23m
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RowOne;