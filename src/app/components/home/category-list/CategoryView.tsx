'use client'
import { GET_CATEGORIES_WITH_IMAGE } from '@/gql/queries/category.queries';
import { useQuery } from '@apollo/client';
import React from 'react'
import CategoryCard from './CategoryCard';
import CategoryCardShimmerEffect from '../../Shimmer-Effect/CategoryCardShimmerEffect';

export type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryView = () => {
    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);
    return (
        <>
            {getCategories?.data?.categories?.length > 0 ?
                getCategories?.data?.categories?.map((category: CategoryPropsType) => (
                    <CategoryCard key={category._id} category={category} />
                ))
                :
                [...Array(6)].map((elem, index) => (<CategoryCardShimmerEffect key={index} />))
            }
        </>
    )
}

export default CategoryView;