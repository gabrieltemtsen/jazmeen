import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Flame, Heart, Sparkle } from 'lucide-react';
import BadgeItem from './BadgeItem';
import SearchInput from '../search/Search';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState('Hot');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const badges = [
        { icon: <Flame />, label: 'Hot', value: 'Hot' },
        { icon: <Heart />, label: 'Top', value: 'Top' },
        { icon: <Sparkle />, label: 'New', value: 'New' },
        { icon: <Coins />, label: 'Portfolio', value: 'Portfolio' },
    ];

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="text-white text-lg font-bold">Jazmeen</div>
                    <div className="hidden md:flex space-x-4">
                        {badges.map(({ icon, label, value }) => (
                            <BadgeItem
                                key={value}
                                icon={icon}
                                label={label}
                                isActive={active === value}
                                onClick={() => setActive(value)}
                            />
                        ))}
                    </div>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col ">
                    <div className="flex gap-4 justify-center items-center content-center">
                        <p className='hidden md:block text-gray-300 hover:text-white cursor-pointer'> What is this?</p>
                        <Button className="hidden md:block bg-slate-500 hover:bg-slate-400 text-white px-4  h-8 rounded">Get Started</Button>
                        <Button className="hidden md:block bg-slate-500 hover:bg-slate-400 text-white px-4  h-8 rounded">Get Started</Button>
                    </div>
                    <div className="hidden md:block mt-4">
                        <SearchInput />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-4 mt-2">
                    {badges.map(({ icon, label, value }) => (
                        <BadgeItem
                            key={value}
                            icon={icon}
                            label={label}
                            isActive={active === value}
                            onClick={() => setActive(value)}
                        />
                    ))}
                    <div className="flex flex-col ">
                        <div className="flex gap-4 justify-center items-center content-center">
                            <p className=' md:block text-gray-300 hover:text-white cursor-pointer'> What is this?</p>
                            <Button className=" md:block bg-slate-500 hover:bg-slate-400 text-white px-4  h-8 rounded">Get Started</Button>
                            <Button className=" md:block bg-slate-500 hover:bg-slate-400 text-white px-4  h-8 rounded">Get Started</Button>
                        </div>
                        <div className=" md:block mt-4">
                            <SearchInput />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
