import React from 'react'

const BrandDetailsCardShimmerEffects = () => {
    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 min-h-screen flex items-center justify-center">
            <div className="animate-pulse  bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="h-6 animate bg-gray-300 rounded w-2/5 mt-4"></h2>
                    <div className=" h-6 animate bg-gray-300 rounded w-1/5 mt-4">
                    </div>
                </div>
                <p className="h-6 animate bg-gray-300 rounded w-2/5 mt-4"></p>
                <p className="h-6 animate bg-gray-300 rounded w-3/5 mt-4"></p>
                <p className="h-6 animate bg-gray-300 rounded w-1/5 mt-4"></p>
                <p className="h-14 animate bg-gray-300 rounded w-4/5 mt-4"></p>
                <p className="h-6 animate bg-gray-300 rounded w-1/5 mt-4"></p>
                <p className="h-6 animate bg-gray-300 rounded w-2/5 mt-4"></p>
                <p className="h-6 animate bg-gray-300 rounded w-1/5 mt-4"></p>
                <p className="h-6 animate bg-gray-300 rounded w-2/5 mt-4"></p>
                <div className="border-t border-gray-300 mt-6 pt-4">
                    <p className="h-6 animate bg-gray-300 rounded w-1/5 mt-4"></p>
                    <p className="h-10 animate bg-gray-300 rounded w-4/5 mt-4"></p>
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="h-8 animate bg-gray-300 rounded w-2/5 mt-4"></button>
                    <button className="h-8 animate bg-gray-300 rounded w-2/5 mt-4"></button>
                </div>
            </div>
        </div>
    )
}

export default BrandDetailsCardShimmerEffects