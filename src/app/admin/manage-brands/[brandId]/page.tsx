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
                        <div className="bg-gradient-to-r from-gray-100 via-accent to-backgroundColor min-h-screen flex items-center justify-center">
                            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-secondary uppercase">{data?.getBrandById?.name}</h2>
                                    <div className={`px-3 py-1 text-white rounded ${data?.getBrandById?.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                        {data?.getBrandById?.status === 'active' ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <p className="text-secondary">Brand ID:</p>
                                <p className="text-secondary font-semibold">{data?.getBrandById?._id}</p>
                                <p className="text-secondary mt-4">Description:</p>
                                <p className="text-secondary">{data?.getBrandById?.description}</p>
                                <p className="text-secondary mt-4">Email:</p>
                                <p className="text-secondary font-semibold">{data?.getBrandById?.email}</p>
                                <p className="text-secondary mt-4">Phone:</p>
                                <p className="text-secondary font-semibold">{data?.getBrandById?.phone}</p>
                                <p className="text-secondary mt-4">Website:</p>
                                <a
                                    href={data?.getBrandById?.website}
                                    className="text-primary font-semibold cursor-pointer hover:underline"
                                >
                                    {data?.getBrandById?.website}
                                </a>
                                <div className="border-t border-gray-300 mt-6 pt-4">
                                    <p className="text-secondary">Location:</p>
                                    <p className="text-secondary">{data?.getBrandById?.location}</p>
                                </div>
                                <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
                                    <Button
                                        onClick={() => router.push(`/admin/manage-brands/update-brand?brandId=${data?.getBrandById?._id}`)}
                                        buttonClass='w-full bg-danger'
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