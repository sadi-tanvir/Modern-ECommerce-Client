'use client'
import React, { useEffect, useState } from 'react'
import WelcomeMessage from './WelcomeMessage'

const WelcomeMessageLayout = () => {
    const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <>
            {showWelcomeMessage &&
                <WelcomeMessage />
            }
        </>
    )
}

export default WelcomeMessageLayout