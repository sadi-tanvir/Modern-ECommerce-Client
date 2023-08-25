import React from 'react'

const BrandTableRowShimmerEffects = () => {
    return (
        <tr className="bg-gray-200">
            <td className="p-3 border border-gray-300">
                <div className="animate-pulse h-10 w-16 bg-gray-300 rounded-md"></div>
            </td>
            <td className="p-3 border border-gray-300 ">
                <div className="animate-pulse h-10 w-32 bg-gray-300 rounded-md mb-1"></div>
            </td>
            <td className="p-3 border border-gray-300 text-center">
                <div className="animate-pulse h-10 w-20 bg-gray-300 rounded-md"></div>
            </td>
            <td className="p-3 border border-gray-300 ">
                <div className="animate-pulse h-10 w-20 bg-gray-300 rounded-md"></div>
            </td>
        </tr>
    )
}

export default BrandTableRowShimmerEffects;