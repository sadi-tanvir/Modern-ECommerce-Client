'use client'
import React, { useEffect, useState } from 'react'
import ProductFilters from '../../stock/ProductFilter';
import SearchArea from '../../stock/SearchArea';
import { useQuery } from '@apollo/client';
import { GET_STOCK_WITH_DETAILS_BY_CATEGORY } from '@/gql/queries/stock.queries';
import ProductList from './ProductList';

export type StockCardTypes = {
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

const StockCategoryLayout = ({ params }: any) => {

    // states
    const [filteredStocks, setFilteredStocks] = useState<StockCardTypes[] | []>([])
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(params.category);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [searchProduct, setSearchProduct] = useState("")


    // gql
    const { loading, error, data, refetch } = useQuery(GET_STOCK_WITH_DETAILS_BY_CATEGORY, {
        variables: {
            category: selectedCategory || params.category
        }
    });



    // search filter
    useEffect(() => {
        const searchResults = data?.getStocksByCategory?.filter((stock: StockCardTypes) => {
            if (searchProduct == "") {
                return stock;
            } else if (stock.name.toLowerCase().includes(searchProduct.toLowerCase())) {
                return stock;
            }
        })
        setFilteredStocks(searchResults)
    }, [searchProduct, data])



    // Filter stocks based on selected filters
    useEffect(() => {
        const resultFilteredStocks = data?.getStocksByCategory?.filter((stock: StockCardTypes) => {
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
        setFilteredStocks(resultFilteredStocks)
    }, [selectedBrand, selectedCategory, selectedPriceRange, selectedRating, data?.stocks])


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center p-4  bg-slate-300 gap-10">
                <div className={`flex justify-between items-center gap-5`}>
                    <SearchArea
                        // isFilterTrue={false}
                        setSearchProduct={setSearchProduct}
                    />
                    <p className="text-gray-600 col-span-2">{filteredStocks?.length} products found</p>
                </div>

                {/* filters */}
                <ProductFilters
                    setSelectedBrand={setSelectedBrand}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedPriceRange={setSelectedPriceRange}
                    setSelectedRating={setSelectedRating}
                    selectedCategory={selectedCategory}
                />
            </div>

            {/* showing products */}
            <ProductList
                filteredStocks={filteredStocks}
            />
        </>
    )
}

export default StockCategoryLayout;