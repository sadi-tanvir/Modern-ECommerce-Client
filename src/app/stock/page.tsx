'use client'
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ProductCard from '../components/product-card/ProductCard';
import { GET_STOCKS_FOR_DETAILS_DISPLAY } from '@/gql/queries/stock.queries';
import Loader from '../components/shared/Loader';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_CATEGORIES } from '@/gql/queries/category.queries';
import SortingSelectInputField from '../components/shared/SortingSelectInputField';
import ProductFilters from '../components/stock/ProductFilter';
import { SearchIcon } from '../components/shared/Icon';
import SearchArea from '../components/stock/SearchArea';

type StockCardTypes = {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    imageUrl: string;
    status: string;
    unit: string;
    quantity: number;
    rating: number;
    isTopSale: boolean;
    category: {
        name: string;
    };
    brand: {
        name: string;
    };
};
// Import necessary components and libraries

const StockDisplay = () => {
    // states
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);

    // gql
    const stocks = useQuery(GET_STOCKS_FOR_DETAILS_DISPLAY);



    // Filter stocks based on selected filters
    const filteredStocks = stocks?.data?.stocks.filter((stock: StockCardTypes) => {
        if (selectedBrand && stock.brand.name !== selectedBrand) {
            return false;
        }
        if (selectedCategory && stock.category.name !== selectedCategory) {
            return false;
        }
        if (selectedPriceRange && stock.price > selectedPriceRange) {
            return false;
        }
        if (selectedRating && stock.rating != selectedRating) {
            return false;
        }
        return true;
    });

    return (
        <div className="bg-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center p-4  bg-slate-300 gap-10">
                <div className='flex justify-between items-center gap-5'>
                    <SearchArea />
                    <p className="text-gray-600 col-span-2">{filteredStocks?.length} products found</p>
                </div>

                {/* filters */}
                <ProductFilters
                    setSelectedBrand={setSelectedBrand}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedPriceRange={setSelectedPriceRange}
                    setSelectedRating={setSelectedRating}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mt-10">
                {filteredStocks?.map((stock: StockCardTypes) => (
                    <ProductCard
                        productId={stock._id}
                        imageSrc={stock.imageUrl}
                        isTopSale={stock.isTopSale}
                        rating={stock.rating}
                        productPrice={stock.price}
                        discountOffer={stock.discount}
                        productName={stock.name}
                        key={stock._id}
                        isInStock={stock.status === 'in-stock' ? true : false}
                    />
                ))}
            </div>
        </div>
    );
};

export default StockDisplay;
