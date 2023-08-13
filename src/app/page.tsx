"use client"
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image'
import { useEffect, useState } from 'react';

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
      {/* Navbar */}
      

      {/* Welcome Message */}
      {showWelcomeMessage &&
        <div className="py-10 bg-primary text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our E-Commerce Store</h1>
          <p className="text-lg">Discover amazing products and great deals!</p>
        </div>
      }

      {/* Product Showcase */}
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Add product cards here */}
          <div className="bg-white p-4 shadow rounded">
            <img src="product-image-url" alt="Product" className="w-full h-40 object-contain mb-4" />
            <h2 className="text-lg font-semibold">Product Name</h2>
            <p className="text-gray-600">Product Description</p>
            <p className="text-blue-500 font-semibold mt-2">$99.99</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        {/* Add your footer content here */}
      </footer>
    </div>
  )
}
