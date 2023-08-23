'use client'
import { GET_CATEGORIES_WITH_IMAGE } from '@/gql/queries/category.queries';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import CategoryCardShimmerEffect from '../Shimmer-Effect/CategoryCardShimmerEffect';
import { useRouter } from 'next/navigation';

type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryLists = () => {
    // state
    const [tooltip, setTooltip] = useState("")

    // navigation
    const router = useRouter()

    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);

    return (
        <>

            {getCategories?.data?.categories?.length > 0 ?
                getCategories?.data?.categories?.map((category: CategoryPropsType) => (
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