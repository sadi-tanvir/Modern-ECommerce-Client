'use client'
import { GET_CATEGORIES_WITH_IMAGE } from "@/gql/queries/category.queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CategoryLists from "../components/stock/CategoryLists";



const CategoryList = () => {


    return (
        <div className="container mx-auto my-8">
            <h2 className="text-3xl font-semibold mb-4 text-secondary">Categories</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 sm:px-0">
                <CategoryLists />
            </div>
        </div>
    )
}

export default CategoryList