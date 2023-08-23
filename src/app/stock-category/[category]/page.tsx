'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import ProductCard from '../../components/product-card/ProductCard';
import { GET_STOCKS_FOR_DETAILS_DISPLAY } from '@/gql/queries/stock.queries';
import ProductFilters from '../../components/stock/ProductFilter';
import SearchArea from '../../components/stock/SearchArea';
import Button from '../../components/shared/Button';



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


const StockDisplay = () => {
    // states
    const [filteredStocks, setFilteredStocks] = useState<StockCardTypes[] | []>([])
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [searchProduct, setSearchProduct] = useState("")
    const [isFilterTrue, setIsFilterTrue] = useState(false)



    // gql
    const stocks = useQuery(GET_STOCKS_FOR_DETAILS_DISPLAY);



    // handle clear filter
    const handleClearFilter = () => {
        setSelectedBrand("")
        setSelectedCategory("")
        setSelectedPriceRange(0)
        setSelectedRating(0)
    }



    // search filter
    useEffect(() => {
        const searchResults = stocks?.data?.stocks?.filter((stock: StockCardTypes) => {
            if (searchProduct == "") {
                return stock;
            } else if (stock.name.toLowerCase().includes(searchProduct.toLowerCase())) {
                return stock;
            }
        })
        setFilteredStocks(searchResults)
    }, [searchProduct, stocks?.data?.stocks])



    // Filter stocks based on selected filters
    useEffect(() => {
        if (selectedBrand || selectedCategory || selectedPriceRange || selectedRating) {
            setIsFilterTrue(true)
        } else {
            setIsFilterTrue(false)
        }

        const resultFilteredStocks = stocks?.data?.stocks?.filter((stock: StockCardTypes) => {
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
    }, [selectedBrand, selectedCategory, selectedPriceRange, selectedRating, stocks?.data?.stocks])


    return (
        <div className="bg-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center p-4  bg-slate-300 gap-10">
                <div className={`flex ${isFilterTrue ? 'flex-wrap justify-around sm:justify-between' : 'justify-between'}  items-center gap-5`}>
                    <SearchArea
                        isFilterTrue={isFilterTrue}
                        setSearchProduct={setSearchProduct}
                    />
                    <p className="text-gray-600 col-span-2">{filteredStocks?.length} products found</p>
                    {isFilterTrue ?
                        <Button onClick={handleClearFilter} buttonClass='hover:bg-red-600 w-52' color='red'>Clear Filters</Button>
                        : null
                    }
                </div>

                {/* filters */}
                <ProductFilters
                    setSelectedBrand={setSelectedBrand}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedPriceRange={setSelectedPriceRange}
                    setSelectedRating={setSelectedRating}
                    selectedBrand={selectedBrand}
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
