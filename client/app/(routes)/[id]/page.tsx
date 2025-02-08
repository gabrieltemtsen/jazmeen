import { Card } from '@/components/ui/card';
import React from 'react';

interface UserProps {
    params: Promise<{
        id: string;
    }>;
}
const User = async ({ params }: UserProps) => {

    const { id } = await params;
    return (
        <div className="border-gray-700 rounded p-4">
            <div className="grid grid-cols-12 gap-4 min-h-[70vh] ">
                {/* Left Section: 8 columns on medium and above, 12 columns on smaller screens */}
                <div className="col-span-12 md:col-span-8 bg-red-500 p-4 rounded-lg ">
                    Left Section
                </div>
                {/* Right Section: 4 columns on medium and above, 12 columns on smaller screens */}
                <div className="col-span-12 md:col-span-4 bg-blue-500 p-4 rounded-lg">
                    Right Section
                </div>
            </div>
        </div>
    );
};

export default User;