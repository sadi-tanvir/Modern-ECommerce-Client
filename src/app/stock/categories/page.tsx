'use client'
import { GET_CATEGORIES_WITH_IMAGE } from "@/gql/queries/category.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

type CategoryPropsType = {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoryList = () => {
    // gql
    const getCategories = useQuery(GET_CATEGORIES_WITH_IMAGE);

    // navigation
    const router = useRouter()

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-3xl font-semibold mb-4 text-secondary">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getCategories?.data?.categories?.map((category: CategoryPropsType) => (
                    <div onClick={() => router.push(`/stock/categories/${category.name}`)} key={category._id} className="bg-white shadow-lg rounded-md p-4">
                        <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover mb-4" />
                        <h3 className="text-lg font-semibold text-secondary">{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryList