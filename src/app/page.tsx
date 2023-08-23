"use client"
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import WelcomeMessage from './components/home/WelcomeMessage';
import BannerSlider from './components/home/BannerSlider';
import CategoryList from './components/home/CategoryList';
import FeaturedProducts from './components/home/FeaturedProducts';
import Footer from './components/Footer';

export default function Home() {
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
    <div className="bg-gray-100">
      {/* Welcome Message */}
      {showWelcomeMessage &&
        <WelcomeMessage />
      }

      {/* Banner Slider */}
      <BannerSlider />


      {/* category lists  */}
      <CategoryList />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Footer */}
      <Footer />
    </div>
  )
}
