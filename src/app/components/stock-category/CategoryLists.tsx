'use client'
import { GET_CATEGORIES_WITH_IMAGE } from '@/gql/queries/category.queries';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import CategoryCardShimmerEffect from '../Shimmer-Effect/CategoryCardShimmerEffect';
import { useRouter } from 'next/navigation';

type CategoryType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryLists = () => {
    // state
    const [tooltip, setTooltip] = useState("")
    const [randomCategories, setRandomCategories] = useState<CategoryType[] | []>([])

    // navigation
    const router = useRouter()

    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);


    // making circular queue operation for picking random categories
    useEffect(() => {
        if (getCategories?.data?.categories?.length > 0) {
            let n = getCategories.data.categories.length;
            let queue = new Array(n);
            let start = -1;
            let end = -1;
            let currentSize = 0;

            const addCategory = (elem: CategoryType) => {
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

            {randomCategories?.length > 0 ?
                randomCategories.map((category: CategoryType) => (
                    <div onClick={() => router.push(`/stock-category/${category.name}`)} key={category._id} className="bg-white shadow-lg rounded-md px-2 py-1 cursor-pointer">
                        <img src={category.imageUrl} alt={category.name} className="w-full h-20 object-cover mb-4" />
                        <div className={`${(tooltip == category._id) && (category.name.length > 12) ? 'block' : 'hidden'} tooltip tooltip-open tooltip-top`} data-tip={category.name}></div>
                        <h3 onMouseEnter={() => setTooltip(category._id)} onMouseLeave={() => setTooltip("")} className="text-lg font-semibold text-secondary">{category.name.length > 12 ? `${category.name.slice(0, 12)}..` : category.name}</h3>
                    </div>
                ))
                :
                [...Array(12)].map((elem, index) => (<CategoryCardShimmerEffect key={index} />))
            }
        </>
    )
}

export default CategoryLists