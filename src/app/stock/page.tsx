'use client'
import { useQuery } from '@apollo/client';
import ProductCard from '../components/ProductCard';
import { GET_STOCKS_FOR_DISPLAY } from '@/gql/queries/stock.queries';
import Loader from '../components/shared/Loader';

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
}

const StockDisplay = () => {

    const stocks = useQuery(GET_STOCKS_FOR_DISPLAY);

    return (
        <>
            {!stocks?.data?.stocks ?
                // loader
                <Loader />
                :
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 bg-white">
                        {stocks?.data?.stocks.map((stock: StockCardTypes) => (
                            <ProductCard
                                productId={stock._id}
                                imageSrc={stock.imageUrl}
                                isTopSale={true}
                                productPrice={stock.price}
                                discountOffer={stock.discount}
                                productDescription={stock.description}
                                productName={stock.name}
                                key={stock._id}
                                isInStock={stock.status === 'in-stock' ? true : false}
                            />
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default StockDisplay;