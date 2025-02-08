'use client';
import Navbar from '@/app/_components/navbar/Navbar';
import React from 'react';
const HomePageLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className='bg-gray-800 min-h-[100vh]'>
            <Navbar />
            <div className="pt-36 p-4">
                {children}
            </div>
        </div>
    );
};

export default HomePageLayout;