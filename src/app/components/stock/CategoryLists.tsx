import { GET_CATEGORIES_WITH_IMAGE } from '@/gql/queries/category.queries';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react'

type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryLists = () => {
    // state
    const [tooltip, setTooltip] = useState("")

    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);

    return (
        <>
            {getCategories?.data?.categories?.map((category: CategoryPropsType) => (
                <div key={category._id} className="bg-white shadow-lg rounded-md px-2 py-1">
                    <img src={category.imageUrl} alt={category.name} className="w-full h-20 object-cover mb-4" />
                    <div className={`${(tooltip == category._id) && (category.name.length > 12) ? 'block' : 'hidden'} tooltip tooltip-open tooltip-top`} data-tip={category.name}></div>
                    <h3 onMouseEnter={() => setTooltip(category._id)} onMouseLeave={() => setTooltip("")} className="text-lg font-semibold text-secondary">{category.name.length > 12 ? `${category.name.slice(0, 12)}..` : category.name}</h3>
                </div>
            ))}
        </>
    )
}

export default CategoryLists