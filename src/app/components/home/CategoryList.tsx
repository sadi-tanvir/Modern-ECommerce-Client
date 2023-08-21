import { GET_CATEGORIES_WITH_IMAGE } from "@/gql/queries/category.queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryList = () => {
    const [tooltip, setTooltip] = useState("")

    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-3xl font-semibold mb-4 text-secondary">Categories</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 sm:px-0">
                {getCategories?.data?.categories?.map((category: CategoryPropsType) => (
                    <div key={category._id} className="bg-white shadow-lg rounded-md px-2 py-1">
                        <img src={category.imageUrl} alt={category.name} className="w-full h-20 object-cover mb-4" />
                        <div className={`${(tooltip == category._id) && (category.name.length > 12) ? 'block' : 'hidden'} tooltip tooltip-open tooltip-top`} data-tip={category.name}></div>
                        <h3 onMouseEnter={() => setTooltip(category._id)} onMouseLeave={() => setTooltip("")} className="text-lg font-semibold text-secondary">{category.name.length > 12 ? `${category.name.slice(0, 12)}..` : category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryList