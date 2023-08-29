'use client'
import { GET_CATEGORIES_WITH_IMAGE } from '@/gql/queries/category.queries';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard';
import CategoryCardShimmerEffect from '../../Shimmer-Effect/CategoryCardShimmerEffect';


type CategoryType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryView = () => {
    // state
    const [randomCategories, setRandomCategories] = useState<CategoryType[] | []>([])

    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);


    // making circular queue operation for picking random categories
    useEffect(() => {
        if (getCategories?.data?.categories?.length > 0) {
            let queue = new Array(6);
            let start = -1;
            let end = -1;
            let currentSize = 0;
            let n = getCategories.data.categories.length;

            const addCategory = (elem: CategoryType) => {
                if (currentSize < queue.length) {
                    if (start == -1 && end == -1) {
                        start = 0;
                        end = 0;
                    };

                    if (end == 6) {
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
                    addCategory(getCategories.data.categories[i]);

                    if (i == n - 1) {
                        i = -1;
                    };
                } else {
                    break;
                };
            };

            setRandomCategories(queue);
        };
    }, [getCategories?.data?.categories]);

    return (
        <>
            {randomCategories.length > 0 ?
                randomCategories.map((category: CategoryType) => (
                    <CategoryCard key={category._id} category={category} />
                ))
                :
                [...Array(6)].map((elem, index) => (<CategoryCardShimmerEffect key={index} />))
            }
        </>
    )
}

export default CategoryView;