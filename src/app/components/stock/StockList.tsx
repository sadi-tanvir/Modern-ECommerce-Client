'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STOCKS_FOR_DETAILS_DISPLAY } from '@/gql/queries/stock.queries';
import SearchArea from './SearchArea';
import Button from '../shared/Button';
import ProductFilters from './ProductFilter';
import ProductCard from '../product-card/ProductCard';
import ProductCardShimmerEffect from '../Shimmer-Effect/ProductCardShimmerEffect';
import Pagination from '../shared/pagination-components/Pagination';

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


const StockList = () => {
    // states
    const [randomStocks, setRandomStocks] = useState<StockCardTypes[] | []>([]);
    const [filteredStocks, setFilteredStocks] = useState<StockCardTypes[] | []>([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [searchProduct, setSearchProduct] = useState("");
    const [isFilterTrue, setIsFilterTrue] = useState(false);

    // pagination states
    const [totalStockCount, setTotalStockCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);


    // gql
    const stocks = useQuery(GET_STOCKS_FOR_DETAILS_DISPLAY, {
        variables: {
            page: page,
            size: size
        }
    });



    // handle clear filter
    const handleClearFilter = () => {
        setSelectedBrand("");
        setSelectedCategory("");
        setSelectedPriceRange(0);
        setSelectedRating(0);
    };



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
    }, [selectedBrand, selectedCategory, selectedPriceRange, selectedRating, stocks?.data?.stocks]);



    // Handle Decrease Pagination
    const handleDecreasePagination = () => {
        if (page > 0) {
            setPage(page - 1);
        } else {
            setPage(Math.floor(totalStockCount / size));
        };
    };



    // Handle Increase Pagination
    const handleIncreasePagination = () => {
        if ((Math.floor(totalStockCount / size)) > page) {
            setPage(page + 1);
        } else {
            setPage(0);
        };
    };



    // making circular queue operation for picking random products
    useEffect(() => {
        if (filteredStocks?.length > 0) {
            let n = filteredStocks.length;
            let queue = new Array(n);
            let start = -1;
            let end = -1;
            let currentSize = 0;

            const addProduct = (elem: StockCardTypes) => {
                if (currentSize < queue.length) {
                    if (start == -1 && end == -1) {
                        start = 0;
                        end = 0;
                    };

                    if (end == n) {
                        end = 0;
                        queue[end] = elem;
                    } else {
                        queue[end] = elem;
                    };
                    end++;
                    currentSize++;
                };
            };

            let randomIndex = Math.floor(Math.random() * n);
            for (let i = randomIndex; i < n; i++) {
                if (currentSize < queue.length) {
                    addProduct(filteredStocks[i]);

                    if (i == n - 1) {
                        i = -1;
                    }
                } else {
                    break;
                }
            };

            setRandomStocks(queue);
        };
    }, [filteredStocks]);



    // get all stock count
    useEffect(() => {
        const fetchTotalStockCount = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/stock-count`);
            const data = await response.json();
            setTotalStockCount(data.totalDocuments);
        };
        fetchTotalStockCount();
    }, [size]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center p-4 bg-accent gap-10">
                <div className={`flex ${isFilterTrue ? 'flex-wrap justify-around sm:justify-between' : 'justify-between'}  items-center gap-5`}>
                    <SearchArea
                        isFilterTrue={isFilterTrue}
                        setSearchProduct={setSearchProduct}
                    />
                    <p className="text-secondary col-span-2">{filteredStocks?.length} products found</p>
                    {isFilterTrue ?
                        <Button onClick={handleClearFilter} buttonClass='w-52 bg-danger'>Clear Filters</Button>
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

            {/* stocks showing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mt-10 pb-32">
                {randomStocks?.length > 0 ?
                    randomStocks?.map((stock: StockCardTypes) => (
                        <ProductCard
                            key={stock._id}
                            stockId={stock._id}
                            imageSrc={stock.imageUrl}
                            isTopSale={stock.isTopSale}
                            rating={stock.rating}
                            productPrice={stock.price}
                            discountOffer={stock.discount}
                            productName={stock.name}
                            isInStock={stock.status === 'in-stock' ? true : false}
                        />
                    ))
                    :
                    [...Array(10)].map((elem, index) => (
                        <ProductCardShimmerEffect key={index} />
                    ))
                }
            </div>

            {/* pagination */}
            <Pagination
                size={size}
                page={page}
                totalStockCount={totalStockCount}
                setPage={setPage}
                handleDecreasePagination={handleDecreasePagination}
                handleIncreasePagination={handleIncreasePagination}
                positionOfPagination='bottom-0 right-0'
            />
        </>
    );
};

export default StockList;

