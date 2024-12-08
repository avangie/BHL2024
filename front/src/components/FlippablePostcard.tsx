'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from './Header'

interface PostcardData {
    frontImage: string
    author: string
    date: string
    text: string
}

interface FlippablePostcardProps {
    postcards: PostcardData[]
}

const FlippablePostcard: React.FC<FlippablePostcardProps> = ({ postcards }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation()
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : postcards.length - 1
            setIsFlipped(true)
            return newIndex
        })
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex < postcards.length - 1 ? prevIndex + 1 : 0
            setIsFlipped(true)
            return newIndex
        })
    }

    console.log(postcards)
    const currentPostcard = postcards[currentIndex]
    const hasImage = currentPostcard.frontImage !== ''

    const handleFlip = () => {
        if (hasImage) {
            setIsFlipped(!isFlipped)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="relative flex items-center mt-8">
                <button
                    onClick={handlePrevious}
                    className="absolute left-[-3rem] z-10 p-2 rounded-full shadow-md"
                    aria-label="Previous postcard"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div
                    className="w-96 h-[36rem] [perspective:1000px] cursor-pointer border-2 border-primary rounded-md overflow-hidden"
                    onClick={handleFlip}
                >
                    <div
                        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''
                            }`}
                    >
                        {/* Front side */}
                        <div className={`absolute w-full h-full [backface-visibility:hidden] ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                            <Image
                                src={currentPostcard.frontImage}
                                alt="Postcard front"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        {/* Back side */}
                        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] p-4 flex flex-col justify-between">
                            <div className="text-right text-sm font-semibold text-muted-foreground">{currentPostcard.author}</div>
                            <div className="text-center text-muted-foreground">{currentPostcard.text}</div>
                            <div className="text-center text-sm text-muted-foreground">{currentPostcard.date}</div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleNext}
                    className="absolute right-[-3rem] z-10 p-2 rounded-full shadow-md"
                    aria-label="Next postcard"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default FlippablePostcard
