import React from 'react'
import SortingSelectInputField from '../shared/SortingSelectInputField';
import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_CATEGORIES } from '@/gql/queries/category.queries';


type ProductFilterProps = {
    setSelectedBrand: (brand: string) => void;
    setSelectedCategory: (category: string) => void;
    setSelectedPriceRange: (priceRange: number) => void;
    setSelectedRating: (rating: number) => void;
    selectedBrand: string;
};

const ProductFilter = ({ setSelectedBrand, setSelectedCategory, setSelectedPriceRange, setSelectedRating, selectedBrand }: ProductFilterProps) => {
    // gql
    const getBrands = useQuery(GET_BRANDS);
    const getCategories = useQuery(GET_CATEGORIES);


    return (
        <>
            <div className="space-x-4 flex flex-row justify-end items-center">
                {/* Brand Filter */}
                < SortingSelectInputField
                    options={
                        getBrands?.data?.brands?.map((brand: { _id: string; name: string; }) => (
                            { label: brand.name, value: brand.name }
                        ))
                    }
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    labelName="All Brands"
                    inputClassName='w-48'
                    value={selectedBrand}
                />

                {/* Category Filter */}
                <SortingSelectInputField
                    options={
                        getCategories?.data?.categories?.map((brand: { _id: string; name: string; }) => (
                            { label: brand.name, value: brand.name }
                        ))
                    }
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    labelName="All Categories"
                    inputClassName='w-48'
                />

                {/* Price Range Filter */}
                <SortingSelectInputField
                    options={[
                        { label: 'Up to ৳50', value: '50' },
                        { label: 'Up to ৳100', value: '100' },
                        { label: 'Up to ৳200', value: '200' },
                        { label: 'Up to ৳300', value: '300' },
                        { label: 'Up to ৳500', value: '500' },
                    ]}
                    onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                    labelName="Any Price"
                    inputClassName='w-48'
                />

                {/* Rating Filter */}
                <SortingSelectInputField
                    options={[
                        { label: '5 Stars', value: 5 },
                        { label: '4 Stars', value: 4 },
                        { label: '3 Stars', value: 3 },
                        { label: '2 Stars', value: 2 },
                        { label: '1 Stars', value: 1 },
                    ]}
                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                    labelName="Any Rating"
                    inputClassName='w-48'
                />
            </div>
        </>
    )
}

export default ProductFilter