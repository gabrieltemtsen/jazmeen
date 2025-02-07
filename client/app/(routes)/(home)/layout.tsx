'use client';
import Navbar from '@/app/_components/navbar/Navbar';
import React from 'react';
const HomePageLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default HomePageLayout;