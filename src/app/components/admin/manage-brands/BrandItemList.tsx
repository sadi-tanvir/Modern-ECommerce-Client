'use client'
import React, { useEffect, useState } from 'react'
import DropdownMenuItem from '../DropdownMenuItem'
import { GET_BRANDS_FOR_ADMIN } from '@/gql/queries/brand.queries'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_BRAND_BY_ID_MUTATION } from '@/gql/mutations/brand.mutations'
import { useRouter } from 'next/navigation'
import { errorAlert, successAlert, warningAlert } from '../../alert-functions/alert'
import { ActionIcon } from '../../shared/Icon'
import BrandTableRowShimmerEffects from '../../Shimmer-Effect/BrandTableRowShimmerEffects'


type BrandTypes = {
    _id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    status: string;
    location: string;
}

const BrandItemList = () => {

    // state
    const [openActionMenu, setOpenActionMenu] = useState(false)
    const [idForMenuAction, setIdForMenuAction] = useState("")


    // gql
    const brands = useQuery(GET_BRANDS_FOR_ADMIN);
    const [deleteBrandMutation, { data, loading, error }] = useMutation(DELETE_BRAND_BY_ID_MUTATION, {
        refetchQueries: [GET_BRANDS_FOR_ADMIN],
    });



    // router
    const router = useRouter();



    // handle action menu
    const handleActionMenu = (id: string) => {
        setOpenActionMenu(!openActionMenu)
        setIdForMenuAction(id)
    }


    // handle delete brand
    const handleDeleteBrand = (id: string) => {
        warningAlert('Yes, Create it!', () => (
            deleteBrandMutation({
                variables: {
                    id
                }
            })
        ))
    }

    useEffect(() => {
        // if brand not deleted
        if (error) errorAlert(error.message)

        // if brand deleted
        if (data) successAlert(data?.deleteStockById?.message);
    }, [data, error]);


    return (
        <>
            {brands?.data?.brands?.length > 0 ?
                brands?.data?.brands?.map((brand: BrandTypes) => (
                    <tr onClick={() => openActionMenu ? setOpenActionMenu(false) : null} key={brand._id}>
                        <td className="p-4 border border-gray-300">{brand.name}</td>
                        <td className="p-4 border border-gray-300">
                            <div className="font-semibold text-secondary pb-1">{brand.email}</div>
                            <div className="text-sm text-gray-600">{brand.phone}</div>
                        </td>
                        <td className="p-4 border border-gray-300  text-center">
                            <span className={`${brand.status == 'active' ? 'bg-green-300 text-green-700' : 'bg-red-300 text-red-700'} px-4 py-1 rounded-md font-semibold`}>
                                {brand.status}
                            </span>
                        </td>
                        <td className="p-4 border border-gray-300">
                            <div className="relative text-left  flex justify-center">
                                <button
                                    onClick={() => handleActionMenu(brand._id)}
                                    type="button"
                                    className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 focus:outline-none"
                                >
                                    <ActionIcon />
                                </button>
                                <div className={`${openActionMenu && (idForMenuAction == brand._id) ? "visible" : "hidden"} origin-top-right absolute right-0 z-50 -mt-36 sm:mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <DropdownMenuItem onClick={() => router.push(`/admin/manage-brands/update-brand?brandId=${brand
                                            ._id}`)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem rest="text-red-500" onClick={() => handleDeleteBrand(brand._id)}>Delete</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/admin/manage-brands/${brand._id}`)}>Details</DropdownMenuItem>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                :
                [...Array(9)].map((elem, index) => (<BrandTableRowShimmerEffects key={index} />))
            }
        </>
    )
}

export default BrandItemList