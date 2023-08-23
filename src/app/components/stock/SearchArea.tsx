import React from 'react'
import { SearchIcon } from '../shared/Icon'

type SearchAreaTypes = {
    isFilterTrue?: boolean;
    setSearchProduct: (e: string) => void;
}

const SearchArea = ({ setSearchProduct, isFilterTrue }: SearchAreaTypes) => {
    return (
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <input
                onChange={(e) => setSearchProduct(e.target.value)}
                type="text"
                className={`${isFilterTrue ? 'w-40' : 'sm:w-96 w-40'}  flex-grow bg-transparent border-none focus:outline-none px-4 py-2`}
                placeholder="Search for products..."
            />
            <button className="bg-primary hover:bg-primary text-white rounded-full p-2">
                <SearchIcon />
            </button>
        </div>
    )
};

export default SearchArea