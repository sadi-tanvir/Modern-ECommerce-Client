"use client"
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image'

const GET_USERS_QUERY = gql`
query getBooks {
  books {
   author
   title
  }
  }`;

export default function Home() {

  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  console.warn('data', data?.books)

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white py-4 shadow">
        {/* Add your navbar content here */}
      </nav>

      {/* Hero Section */}
      <div className="py-10 bg-blue-500 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our E-Commerce Store</h1>
        <p className="text-lg">Discover amazing products and great deals!</p>
      </div>

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

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUJYwKPX9RQCO9peGl-bbFVIixKa0xkq1Ux8QQ2QP&s"
          alt="Product"
          className="h-48 w-full object-cover object-center"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Name</h2>
          <p className="text-gray-600 mb-4">Product Description</p>
          <div className="flex items-center justify-between">
            <p className="text-blue-500 font-semibold">$99.99</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
