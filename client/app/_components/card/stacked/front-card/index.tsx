import { Bg, spaceCity2 } from '@/constants/ImageExport';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface FrontCardProps {
  title: string;
  tokenAddress: string;
  rating: string;
  className?: string;
  image: string;
}

const FrontCard: React.FC<FrontCardProps> = ({
  title,
  tokenAddress,
  rating,
  className = "",
  image,
}) => {
  return (
    <div
      className={'card flex flex-col justify-center p-3 sm:p-5 rounded-[10%] border border-gray-400/40 relative text-white overflow-hidden h-fit w-fit z-10 hover:-translate-y-10 transition-all duration-300 ' + className}
      style={{ backgroundImage: `url(${spaceCity2})` }}
    >
      <Link href={`/${tokenAddress}`} className="block border-gray-700 rounded">
        <div className="inset-0 absolute z-0">
          <Image src={Bg} alt="background" className="w-full h-full object-cover opacity-10" layout="fill" />
        </div>
        <div className="flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold mb-0.5">{title}</h2>
            <p className="text-xs opacity-70 w-16 sm:w-20 truncate">{tokenAddress}</p>
          </div>
          <div className="bg-[rgba(0,0,0,0.4)] flex items-center pl-1 pr-2 py-1 rounded-3xl gap-2">
            <div className="icon h-[20px] w-[20px] sm:h-[25px] sm:w-[25px] rounded-full grid place-content-center">
              $
            </div>
            <p className="text-xs">{rating}</p>
          </div>
        </div>
        <Image
          src={image}
          alt={title}
          className="w-52 h-52 sm:w-40 md:w-52 sm:h-40 md:h-52 object-contain mt-3 sm:mt-5 bg-gray-800 rounded-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] mx-2 sm:mx-5 mb-3 sm:mb-7"
          width={208} // Adjust width as needed
          height={208} // Adjust height as needed
        />
      </Link>
    </div>
  );
};

export default FrontCard;
