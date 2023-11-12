'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_FOR_DETAILS_DISPLAY } from '@/gql/queries/product.queries';
import SearchArea from './SearchArea';
import Button from '../shared/Button';
import ProductFilters from './ProductFilter';
import ProductCard from '../product-card/ProductCard';
import ProductCardShimmerEffect from '../Shimmer-Effect/ProductCardShimmerEffect';
import Pagination from '../shared/pagination-components/Pagination';


type ProductCardTypes = {
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


const ProductsList = () => {
    // states
    const [randomProducts, setRandomProducts] = useState<ProductCardTypes[] | []>([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<number>(-1);
    const [selectedRating, setSelectedRating] = useState<number>(-1);
    const [searchProduct, setSearchProduct] = useState("");
    const [isFilterTrue, setIsFilterTrue] = useState(false);

    // pagination states
    const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);


    // gql
    const products = useQuery(GET_PRODUCTS_FOR_DETAILS_DISPLAY, {
        variables: {
            page,
            size,
            filteredBy: {
                brand: selectedBrand,
                category: selectedCategory,
                price: selectedPriceRange,
                rating: selectedRating,
            },
            search: searchProduct
        }
    });

    console.log(products);



    // handle clear filter
    const handleClearFilter = () => {
        setSelectedBrand("");
        setSelectedCategory("");
        setSelectedPriceRange(-1);
        setSelectedRating(-1);
    };



    // Handle Decrease Pagination
    const handleDecreasePagination = () => {
        if (page > 0) {
            setPage(page - 1);
        } else {
            setPage(Math.floor(totalProductsCount / size));
        };
    };



    // Handle Increase Pagination
    const handleIncreasePagination = () => {
        if ((Math.floor(totalProductsCount / size)) > page) {
            setPage(page + 1);
        } else {
            setPage(0);
        };
    };




    // search filter
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        clearTimeout(timer);
        if (searchProduct) {
            timer = setTimeout(() => {
                console.log('executed after 3 seconds');

                // refetch products
                products.refetch({
                    page,
                    size,
                    filteredBy: {
                        brand: selectedBrand,
                        category: selectedCategory,
                        price: selectedPriceRange,
                        rating: selectedRating,
                    },
                    search: searchProduct
                });
            }, 3000)
        }

        return () => clearTimeout(timer);
    }, [searchProduct]);


    // Filter products based on selected filters
    useEffect(() => {
        if (selectedBrand || selectedCategory || (selectedPriceRange > -1) || (selectedRating > -1)) {
            setIsFilterTrue(true)

            // refetch products
            products.refetch({
                page,
                size,
                filteredBy: {
                    brand: selectedBrand,
                    category: selectedCategory,
                    price: selectedPriceRange,
                    rating: selectedRating,
                },
                search: searchProduct
            })
        } else {
            setIsFilterTrue(false)
        }

        // update product count into the state for pagination
        if (products?.data?.getProducts?.totalProductsCount) setTotalProductsCount(products?.data?.getProducts?.totalProductsCount)
    }, [selectedBrand, selectedCategory, selectedPriceRange, selectedRating, products?.data?.getProducts?.totalProductsCount]);



    // making circular queue operation for picking random products
    useEffect(() => {
        if (products?.data?.getProducts?.products?.length > 0) {
            let n = products.data.getProducts.products.length;
            let queue = new Array(n);
            let start = -1;
            let end = -1;
            let currentSize = 0;

            const addProduct = (elem: ProductCardTypes) => {
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
                    addProduct(products.data.getProducts.products[i]);

                    if (i == n - 1) {
                        i = -1;
                    }
                } else {
                    break;
                }
            };

            setRandomProducts(queue);
        };
    }, [products?.data?.getProducts?.products]);


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center p-4 bg-accent gap-10">
                <div className={`flex ${isFilterTrue ? 'flex-wrap justify-around sm:justify-between' : 'justify-between'}  items-center gap-5`}>
                    <SearchArea
                        isFilterTrue={isFilterTrue}
                        setSearchProduct={setSearchProduct}
                    />
                    <p className="text-secondary col-span-2">{totalProductsCount} products found</p>
                    {isFilterTrue ?
                        <Button onClick={handleClearFilter} buttonClass='w-52 bg-red-500' boxShadowColor='#dc2626'>Clear Filters</Button>
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

            {/* products showing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mt-10 pb-32">
                {randomProducts?.length > 0 ?
                    randomProducts?.map((product: ProductCardTypes) => (
                        <ProductCard
                            key={product._id}
                            stockId={product._id}
                            imageSrc={product.imageUrl}
                            isTopSale={product.isTopSale}
                            rating={product.rating}
                            productPrice={product.price}
                            discountOffer={product.discount}
                            productName={product.name}
                            isInStock={product.status === 'in-stock' ? true : false}
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
                totalStockCount={totalProductsCount}
                setPage={setPage}
                handleDecreasePagination={handleDecreasePagination}
                handleIncreasePagination={handleIncreasePagination}
                positionOfPagination='bottom-0 right-0'
            />
        </>
    );
};

export default ProductsList;

