import React from 'react';
import RightGrid from './_components/right-grid/RightGrid';

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
            <div className="grid grid-cols-12 gap-4 min-h-[70vh]">
                {/* Left Section: Stays below on small screens, normal order on larger screens */}
                <div className="col-span-12 xl:col-span-8 bg-red-500 p-4 rounded-lg">
                    Left Section
                </div>
                {/* Right Section: Appears first on smaller screens, normal order on larger screens */}
                <div className="col-span-12 xl:col-span-4   rounded-lg order-first md:order-none">
                    <RightGrid />
                </div>
            </div>
        </div>
    );
};

export default User;