"use client"
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import WelcomeMessage from './components/home/WelcomeMessage';
import BannerSlider from './components/home/BannerSlider';
import { GET_CATEGORIES_WITH_IMAGE } from '@/gql/queries/category.queries';
import CategoryList from './components/home/CategoryList';

export default function Home() {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);



  // gql
  const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);

  console.warn("getCategories", getCategories?.data?.categories);


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
      <CategoryList
        categories={getCategories?.data?.categories}
      />


      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        all rights reserved
      </footer>
    </div>
  )
}
