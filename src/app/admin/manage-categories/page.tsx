'use client'
import CategoryTableRowShimmerEffects from "@/app/components/Shimmer-Effect/CategoryTableRowShimmerEffects";
import AdminDashboardLayout from "@/app/components/admin/AdminDashboardLayout";
import { errorAlert, successAlert, warningAlert } from "@/app/components/alert-functions/alert";
import { ActionIcon } from "@/app/components/shared/Icon";
import { DELETE_CATEGORY_BY_ID_MUTATION } from "@/gql/mutations/category.mutations";
import { GET_CATEGORIES_FOR_ADMIN } from "@/gql/queries/category.queries";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


type CategoryType = {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
};


const StockTable = () => {
    // state
    const [openActionMenu, setOpenActionMenu] = useState(false)
    const [idForMenuAction, setIdForMenuAction] = useState("")


    // navigation
    const router = useRouter();


    // gql
    const categories = useQuery(GET_CATEGORIES_FOR_ADMIN);
    const [deleteCategoryMutation, { data, loading, error }] = useMutation(DELETE_CATEGORY_BY_ID_MUTATION, {
        refetchQueries: [GET_CATEGORIES_FOR_ADMIN],
    });



    // handle action menu
    const handleActionMenu = (id: string) => {
        setOpenActionMenu(!openActionMenu)
        setIdForMenuAction(id)
    }



    // handle delete category
    const handleDeleteCategory = (id: string) => {
        warningAlert('Yes, Create it!', () => (
            deleteCategoryMutation({
                variables: {
                    id
                }
            })
        ))
    }

    useEffect(() => {
        // if category not deleted
        if (error) errorAlert(error.message)

        // if category deleted
        if (data) successAlert(data?.deleteStockById?.message);
    }, [data, error]);

    return (
        <AdminDashboardLayout>
            <div onClick={() => openActionMenu ? setOpenActionMenu(false) : null} className="w-screen sm:w-full overflow-x-auto sm:overflow-x-visible">
                <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 border border-gray-300">Image</th>
                            <th className="p-4 border border-gray-300">Name</th>
                            <th className="p-4 border border-gray-300">Description</th>
                            <th className="p-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.data?.categories?.length > 0 ?
                            categories?.data?.categories?.map((category: CategoryType) => (
                                <tr key={category._id}>
                                    <td className="p-4 border border-gray-300">
                                        <div className="flex justify-center">
                                            <Image
                                                src={category.imageUrl}
                                                alt={category.name}
                                                width={64}
                                                height={64}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        {category.name}
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        {category.description}
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        <div className="relative inline-block text-left  flex justify-center">
                                            <button
                                                onClick={() => handleActionMenu(category._id)}
                                                type="button"
                                                className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 focus:outline-none"
                                            >
                                                <ActionIcon />
                                            </button>
                                            <div className={`${openActionMenu && (idForMenuAction == category._id) ? "visible" : "hidden"} origin-top-right absolute right-0 z-50 -mt-36 sm:mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                >
                                                    <MenuItem onClick={() => router.push(`/admin/manage-categories/update-category?categoryId=${category
                                                        ._id}`)}>Edit</MenuItem>
                                                    <MenuItem rest="text-red-500" onClick={() => handleDeleteCategory(category._id)}>Delete</MenuItem>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            :
                            [...Array(9)].map((elem, index) => (<CategoryTableRowShimmerEffects key={index} />))
                        }
                    </tbody>
                </table>
            </div>
        </AdminDashboardLayout>
    );
};

const MenuItem = ({ children, rest, onClick }: { children: string, rest?: any, onClick: () => void }) => {
    return (
        <a onClick={onClick} href="#" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${rest}`} role="menuitem" >
            {children}
        </a>
    );
};

export default StockTable;

