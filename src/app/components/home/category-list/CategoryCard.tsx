import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryCard = ({ category }: { category: CategoryPropsType }) => {
    // states
    const [tooltip, setTooltip] = useState("")

    // navigation
    const router = useRouter()

    return (
        <div key={category._id} className="bg-white shadow-lg rounded-md px-2 py-1 cursor-pointer" onClick={() => router.push(`/stock-category/${category.name}`)}>
            <img src={category.imageUrl} alt={category.name} className="w-full h-20 object-cover mb-4" />
            <div className={`${(tooltip == category._id) && (category.name.length > 12) ? 'block' : 'hidden'} tooltip tooltip-open tooltip-top`} data-tip={category.name}></div>
            <h3 onMouseEnter={() => setTooltip(category._id)} onMouseLeave={() => setTooltip("")} className="text-lg font-semibold text-secondary">{category.name.length > 12 ? `${category.name.slice(0, 12)}..` : category.name}</h3>
        </div>
    )
}

export default CategoryCard