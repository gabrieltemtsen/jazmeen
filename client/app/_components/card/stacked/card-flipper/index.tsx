'use client';
import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { TokenItem } from '@/app/context/token';
import FrontCard from '../front-card';
import { TokenCardMinimal } from '../back-card';
import { spaceCity1 } from '@/constants/ImageExport';

interface MouseTrack {
    startX: number | null;
    tracking: boolean;
}

interface CardFlipperProps {
    eachData: TokenItem;
    index: number;
}

const CardFlipper: React.FC<CardFlipperProps> = ({ eachData, index }) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const [mouseTrack, setMouseTrack] = useState<MouseTrack>({
        startX: null,
        tracking: false
    });

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        setMouseTrack({
            startX: e.clientX,
            tracking: true
        });
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isAnimating || !mouseTrack.tracking || mouseTrack.startX === null) return;

        const currentX = e.clientX;
        const cardRect = cardRef.current?.getBoundingClientRect();
        const cardWidth = cardRect?.width || 0;

        const distanceMoved = Math.abs(currentX - mouseTrack.startX);
        const percentageMoved = (distanceMoved / cardWidth) * 100;

        if (percentageMoved >= 50) {
            setIsAnimating(true);
            setIsFlipped((prev) => !prev);
            setMouseTrack((prev) => ({ ...prev, startX: currentX }));
        }
    };

    const handleMouseLeave = () => {
        setMouseTrack({ startX: null, tracking: false });
    };

    return (
        <div
            className="flip-card w-full pb-60"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
        >
            <motion.div
                className="flip-card-inner w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={() => setIsAnimating(false)}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="flip-card-front w-full h-full">
                    <div className="w-full h-full ">
                        <FrontCard
                            title={eachData.name}
                            tokenAddress={eachData.tokenAddress}
                            rating={eachData.symbol}
                            image={eachData.imageUrl}
                            className={index !== 0 ? 'shadow-lg' : ''}
                        />
                    </div>
                </div>

                <div className="flip-card-back flip-card !h-[350px] overflow-hidden w-[250px] bg-gradient-custom text-white rounded-[10%] p-5 flex flex-col items-center justify-center" style={{ backgroundImage: `url(${spaceCity1})` }}>
                   <TokenCardMinimal token={eachData} />
                </div>
            </motion.div>
        </div>
    );
};

export default CardFlipper;