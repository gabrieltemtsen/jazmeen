'use client';
import Navbar from '@/app/_components/navbar/Navbar';
import { spaceCity1 } from '@/constants/ImageExport';
import React from 'react';
import { BubblesBackground } from './_components/bubble-background';

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout: React.FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div className='bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen relative' 
         style={{ backgroundImage: `url(${spaceCity1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <BubblesBackground />
      <Navbar />
      <div className="pt-36 p-4 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default HomePageLayout;
