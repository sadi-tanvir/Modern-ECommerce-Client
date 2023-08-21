import React from 'react'
import { SearchIcon } from '../shared/Icon'

const SearchArea = () => {
    return (
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <input
                type="text"
                className="sm:w-96 w-40 flex-grow bg-transparent border-none focus:outline-none px-4 py-2"
                placeholder="Search for products..."
            />
            <button className="bg-primary hover:bg-primary text-white rounded-full p-2">
                <SearchIcon />
            </button>
        </div>
    )
}

export default SearchArea