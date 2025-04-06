import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Flame, Heart, Sparkle, Menu, X, Search } from 'lucide-react';
import Link from 'next/link';
import SearchInput from '../search/Search';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState('Hot');
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const badges = [
        { icon: <Flame size={18} />, label: 'Hot', value: 'Hot' },
        { icon: <Heart size={18} />, label: 'Top', value: 'Top' },
        { icon: <Sparkle size={18} />, label: 'New', value: 'New' },
        { icon: <Coins size={18} />, label: 'Portfolio', value: 'Portfolio' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-gray-900'}`}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo and primary navigation */}
                    <div className="flex items-center space-x-8">
                        <Link href='/' className="text-white text-xl font-bold tracking-tight">
                            Jazmeen
                        </Link>
                        
                        <div className="hidden md:flex space-x-1">
                            {badges.map(({ icon, label, value }) => (
                                <button
                                    key={value}
                                    onClick={() => setActive(value)}
                                    className={`flex items-center px-4 py-2 rounded-full text-sm transition-all ${
                                        active === value 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <span className="mr-2">{icon}</span>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search and actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <SearchInput />
                        </div> 
                        
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 text-sm rounded-full transition-all">
                            Launch a coin
                        </Button>
                        
                        <Button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-4 py-2 text-sm rounded-full transition-all">
                            Connect
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu} 
                            className="text-white p-2 rounded-full hover:bg-gray-800 focus:outline-none"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-fadeIn">
                    <div className="container mx-auto px-4 py-3 space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {badges.map(({ icon, label, value }) => (
                                <button
                                    key={value}
                                    onClick={() => setActive(value)}
                                    className={`flex items-center px-4 py-2 rounded-full text-sm transition-all ${
                                        active === value 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <span className="mr-2">{icon}</span>
                                    {label}
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-4">
                            <SearchInput />
                        </div>
                        
                        <div className="flex flex-col space-y-3 pt-2">
                            <button className="text-gray-300 hover:text-white text-sm w-full text-left py-2">
                                What is this?
                            </button>
                            
                            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 text-sm rounded-full transition-all w-full">
                                Launch a coin
                            </Button>
                            
                            <Button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 py-2 text-sm rounded-full transition-all w-full">
                                Connect
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;