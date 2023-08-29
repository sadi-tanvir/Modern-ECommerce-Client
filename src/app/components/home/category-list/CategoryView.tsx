'use client'
import { GET_CATEGORIES_WITH_IMAGE } from '@/gql/queries/category.queries';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard';
import CategoryCardShimmerEffect from '../../Shimmer-Effect/CategoryCardShimmerEffect';


export type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryView = () => {
    // state
    const [categories, setCategories] = useState<CategoryPropsType[] | []>([])
    const [randomCategories, setRandomCategories] = useState<CategoryPropsType[] | []>([])

    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);

    // fill data into category state
    useEffect(() => {
        if (getCategories?.data?.categories) {
            setCategories(getCategories?.data?.categories)
        }
    }, [getCategories?.data?.categories])


    // making circular queue operation for picking random categories
    useEffect(() => {
        if (categories.length > 0) {
            let queue = new Array(6);
            let start = -1;
            let end = -1;
            let currentSize = 0;
            let n = categories.length;

            const enqueue = (elem: any) => {
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
                    enqueue(categories[i]);

                    if (i == n - 1) {

                        i = -1;
                    };
                } else {
                    break;
                };
            };

            setRandomCategories(queue);
        };
    }, [categories]);

    return (
        <>
            {randomCategories.length > 0 ?
                randomCategories.map((category: CategoryPropsType) => (
                    <CategoryCard key={category._id} category={category} />
                ))
                :
                [...Array(6)].map((elem, index) => (<CategoryCardShimmerEffect key={index} />))
            }
        </>
    )
}

export default CategoryView;