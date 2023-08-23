import { GET_CATEGORIES_WITH_IMAGE } from "@/gql/queries/category.queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CategoryCardShimmerEffect from "../Shimmer-Effect/CategoryCardShimmerEffect";
import CategoryCard from "./CategoryCard";
import { useRouter } from 'next/navigation';

export type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryList = () => {
    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);


    // navigation
    const router = useRouter();

    return (
        <>
            <div className="container mx-auto my-8">
                <div className='grid grid-cols-2 px-3'>
                    <h2 className="sm:text-2xl font-semibold mb-4 text-secondary">Categories</h2>
                    <button
                        className="ml-auto w-32 h-10 md:w-52 bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg"
                        onClick={() => router.push('/stock-category')}
                    >
                        view all
                    </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 sm:px-0 mt-5">
                    {getCategories?.data?.categories?.length > 0 ?
                        getCategories?.data?.categories?.map((category: CategoryPropsType) => (
                            <CategoryCard key={category._id} category={category} />
                        ))
                        :
                        [...Array(6)].map((elem, index) => (<CategoryCardShimmerEffect key={index} />))
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryList