'use client'
import BrandDetailsCardShimmerEffects from '@/app/components/Shimmer-Effect/BrandDetailsCardShimmerEffects';
import Button from '@/app/components/shared/Button';
import { GET_BRAND_BY_ID } from '@/gql/queries/brand.queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React from 'react';

// AdminStockDetailsType
const ProductDetails = ({ params }: any) => {
    // navigation
    const router = useRouter()


    // gql
    const { loading, error, data, refetch } = useQuery(GET_BRAND_BY_ID, {
        variables: {
            id: params.brandId
        }
    });


    return (
        <>
            {
                data?.getBrandById ?
                    <>
                        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 min-h-screen flex items-center justify-center">
                            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-800 uppercase">{data?.getBrandById?.name}</h2>
                                    <div className={`px-3 py-1 text-white rounded ${data?.getBrandById?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {data?.getBrandById?.status === 'active' ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <p className="text-gray-600">Brand ID:</p>
                                <p className="text-gray-800">{data?.getBrandById?._id}</p>
                                <p className="text-gray-600 mt-4">Description:</p>
                                <p className="text-gray-800">{data?.getBrandById?.description}</p>
                                <p className="text-gray-600 mt-4">Email:</p>
                                <p className="text-gray-800">{data?.getBrandById?.email}</p>
                                <p className="text-gray-600 mt-4">Phone:</p>
                                <p className="text-gray-800">{data?.getBrandById?.phone}</p>
                                <p className="text-gray-600 mt-4">Website:</p>
                                <a
                                    href={data?.getBrandById?.website}
                                    className="text-blue-500 font-semibold cursor-pointer hover:underline"
                                >
                                    {data?.getBrandById?.website}
                                </a>
                                <div className="border-t border-gray-300 mt-6 pt-4">
                                    <p className="text-gray-600">Location:</p>
                                    <p className="text-gray-800">{data?.getBrandById?.location}</p>
                                </div>
                                <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
                                    <Button
                                        onClick={() => router.push(`/admin/manage-brands/update-brand?brandId=${data?.getBrandById?._id}`)}
                                        color='red'
                                        buttonClass='w-full'
                                    >
                                        edit
                                    </Button>
                                    <Button onClick={() => router.push("/admin/manage-brands")} buttonClass='bg-primary w-full'>
                                        Back to Brand List
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <BrandDetailsCardShimmerEffects />
                    </>
            }
        </>
    );
};

export default ProductDetails;