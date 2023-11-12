'use client'
import { DELETE_CATEGORY_BY_ID_MUTATION } from '@/gql/mutations/category.mutations';
import { GET_CATEGORIES_FOR_ADMIN } from '@/gql/queries/category.queries';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { errorAlert, successAlert, warningAlert } from '../../alert-functions/alert';
import Image from 'next/image';
import { ActionIcon } from '../../shared/Icon';
import DropdownMenuItem from '../DropdownMenuItem';
import CategoryTableRowShimmerEffects from '../../Shimmer-Effect/CategoryTableRowShimmerEffects';


type CategoryType = {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
};

const CategoryItemList = () => {
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
        if (data) successAlert(data?.deleteProductById?.message);
    }, [data, error]);

    return (
        <>
            {categories?.data?.categories?.length > 0 ?
                categories?.data?.categories?.map((category: CategoryType) => (
                    <tr onClick={() => openActionMenu ? setOpenActionMenu(false) : null} key={category._id} className='text-secondary'>
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
                            <div className="relative text-left  flex justify-center">
                                <button
                                    onClick={() => handleActionMenu(category._id)}
                                    type="button"
                                    className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 text-secondary focus:outline-none"
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
                                        <DropdownMenuItem onClick={() => router.push(`/admin/manage-categories/update-category?categoryId=${category
                                            ._id}`)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem rest="text-danger" onClick={() => handleDeleteCategory(category._id)}>Delete</DropdownMenuItem>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                :
                [...Array(9)].map((elem, index) => (<CategoryTableRowShimmerEffects key={index} />))
            }
        </>
    )
}

export default CategoryItemList