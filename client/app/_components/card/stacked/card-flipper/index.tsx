'use client';
import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Card from '../card';

interface MouseTrack {
    startX: number | null;
    tracking: boolean;
}

interface CardFlipperProps {
    eachData: {
        title: string;
        subtitle: string;
        rating: string;
        image: string;
    };
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
                    <div className="w-full h-full">
                        <Card
                            title={eachData.title}
                            subtitle={eachData.subtitle}
                            rating={eachData.rating}
                            image={eachData.image}
                            className={index !== 0 ? 'shadow-lg' : ''}
                        />
                    </div>
                </div>

                <div className="flip-card-back flip-card !h-[350px] w-[250px] bg-green-600 text-white rounded-[10%] p-5 flex flex-col items-center justify-center">
                    <div className="">back</div>
                </div>
            </motion.div>
        </div>
    );
};

export default CardFlipper;