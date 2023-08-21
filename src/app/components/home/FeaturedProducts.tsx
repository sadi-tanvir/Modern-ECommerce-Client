import React from 'react';
import ProductCard from '../product-card/ProductCard';
import { GET_STOCKS_FOR_DETAILS_DISPLAY } from '@/gql/queries/stock.queries';
import { useQuery } from '@apollo/client';


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

const FeaturedProducts = () => {

    const stocks = useQuery(GET_STOCKS_FOR_DETAILS_DISPLAY);

    return (
        <>
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto">
                    <div className='grid grid-cols-2 px-3'>
                        <h2 className="sm:text-2xl font-semibold mb-4 text-secondary">Featured Products - Just for you</h2>
                        <button
                            className="ml-auto w-32 h-10 md:w-52 bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg"
                        // onClick=}
                        >
                            view all
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {stocks?.data?.stocks.slice(0, 12).map((stock: StockCardTypes) => (
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
            </section>
        </>
    );
};

export default FeaturedProducts;