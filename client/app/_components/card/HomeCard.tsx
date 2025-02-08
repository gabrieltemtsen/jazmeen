import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { cardBgImage } from '@/constants/ImageExport';
import { Zap } from 'lucide-react';
import React from 'react';

const HomeCard = () => {
    return (
        <Card className="border-gray-700 rounded cursor-pointer hover:-rotate-1 hover:scale-105 hover:border-gray-500">
            {/* Smaller screen layout (less than md) */}
            <div className="hidden md:block border-gray-700 rounded">
                <div className="grid grid-cols-12 gap-2 p-1 rounded-lg shadow-md max-w-2xl mx-auto">
                    <div style={{ backgroundImage: `url(${cardBgImage})` }} className="col-span-4 bg-cover bg-no-repeat row-span-2  p-4 rounded-lg" />
                    {/* top right */}
                    <div className="col-span-8  p-4 rounded-lg">
                        <div className="flex justify-between">
                            <span className='text-sm text-gray-500'>$EXP</span>
                            <span className='text-xs text-gray-500'>4 hrs ago</span>
                        </div>
                        <div className="text-gray-100">Clanker Experience</div>
                        <div className="flex justify-normal gap-10 mt-2 ">
                            <div className="flex flex-col  ">
                                <div className="text-gray-500 text-xs">Market Cap</div>
                                <div className="text-gray-500 text-xs">$223.34</div>
                            </div>
                            <div className="flex flex-col  ">
                                <div className="text-gray-500 text-xs">24hr Volume</div>
                                <div className="text-gray-500 text-xs">$223.34k</div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom right */}
                    <div className="col-span-8 border-t border-t-gray-500 p-4 -mt-4 rounded-lg">
                        <div className="flex gap-3 -mt-2 -mb-2">
                            <div className="">
                                <Avatar className='h-6 w-6 mt-2'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className='text-sm text-gray-100'>TOCHI</span>
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
                </div>
            </div>

            {/* Medium and above screen layout (md and above) */}
            <div className="block md:hidden hov">
                <div className=" grid grid-cols-12 gap-4 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
                    <div style={{ backgroundImage: `url(${cardBgImage})` }} className="col-span-4 h-36 p-4 rounded-lg bg-cover bg-no-repeat min-h-40" />
                    <div className="col-span-8 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <span className='text-sm text-gray-500'>$EXP</span>
                            <span className='text-xs text-gray-500'>4 hrs ago</span>
                        </div>
                        <div className="text-gray-100">Clanker Experience</div>
                        <div className="flex justify-normal gap-10 mt-2 ">
                            <div className="flex flex-col  ">
                                <div className="text-gray-500 text-xs">Market Cap</div>
                                <div className="text-gray-500 text-xs">$223.34</div>
                            </div>
                            <div className="flex flex-col  ">
                                <div className="text-gray-500 text-xs">24hr Volume</div>
                                <div className="text-gray-500 text-xs">$223.34k</div>
                            </div>
                        </div>
                        {/* Top Right Section (8 columns) */}
                    </div>
                    <div className="col-span-12 p-4 rounded-lg border-t border-t-gray-600">
                        <div className="flex gap-3 -mt-2 -mb-2">
                            <div className="">
                                <Avatar className='h-6 w-6 mt-2'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className='text-sm text-gray-100'>TOCHI</span>
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
                </div>
            </div>
        </Card>
    );
};

export default HomeCard;
