'use client'
import { useQuery } from '@apollo/client';
import ProductCard from '../components/ProductCard';
import { GET_STOCKS_FOR_DISPLAY } from '@/gql/queries/stock.queries';

const productsData = [
    {
        id: 1,
        category: 'electronics',
        name: 'Smartphone',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '$499.99',
    },
    {
        id: 2,
        category: 'electronics',
        name: 'Headphones',
        description: 'Nulla facilisi. Ut tristique sapien sit amet bibendum elementum.',
        price: '$99.99',
    },
    {
        id: 3,
        category: 'clothing',
        name: 'T-Shirt',
        description: 'Fusce dictum venenatis mauris vel blandit.',
        price: '$29.99',
    },
    // Add more products as needed
];

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
    category: {
        name: string;
    }
    brand: {
        name: string;
    }
}

// https://images.squarespace-cdn.com/content/v1/5bf4bf814611a019a7c475f0/1562038085083-DLUD125WWPOUTGYD8Q60/ke17ZwdGBToddI8pDm48kHH9S2ID7_bpupQnTdrPcoF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0nQwvinDXPV4EYh2MRzm-RRB5rUELEv7EY2n0AZOrEupxpSyqbqKSgmzcCPWV5WMiQ/product%2Bphotography
const CategoryPage = () => {

    const stocks = useQuery(GET_STOCKS_FOR_DISPLAY);
    console.warn(stocks);

    // Filter products based on the selected category
    const productsByCategory = productsData

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                {stocks?.data?.stocks.map((stock: StockCardTypes) => (
                    <ProductCard
                        imageSrc={stock.imageUrl}
                        isTopSale={true}
                        productPrice={stock.price}
                        discountOffer={stock.discount}
                        productDescription={stock.description}
                        productName={stock.name}
                        key={stock._id}
                        brandName={stock.brand.name}
                        isInStock={stock.status === 'in-stock' ? true : false}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;