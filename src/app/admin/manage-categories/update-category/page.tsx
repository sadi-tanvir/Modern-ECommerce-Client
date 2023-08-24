'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import MultiSelectInputField from '@/app/components/shared/MultiSelectInputField';
import SelectInputField from '@/app/components/shared/SelectInputField';
import TextInputField from '@/app/components/shared/TextInputField';
import { useMutation, useQuery } from '@apollo/client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { warningAlert, successAlert, errorAlert } from "../../../components/alert-functions/alert";
import { GET_CATEGORIES, GET_CATEGORIES_FOR_ADMIN, GET_CATEGORY_BY_ID } from '@/gql/queries/category.queries';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCK_WITH_DETAILS_BY_ID } from '@/gql/queries/stock.queries';
import { useSearchParams } from "next/navigation"
import { UPDATE_STOCK_MUTATION } from '@/gql/mutations/stock.mutations';
import { UPDATE_CATEGORY_BY_ID_MUTATION } from '@/gql/mutations/category.mutations';

type CategoryType = {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
};

const UpdateStock: React.FC = () => {
    const categoryStateValue = {
        _id: '',
        name: '',
        description: '',
        imageUrl: '',
    };



    // states
    const [categoryData, setCategoryData] = useState(categoryStateValue);



    // navigation
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');



    // gql
    const getCategory = useQuery(GET_CATEGORY_BY_ID, {
        variables: {
            id: categoryId
        }
    });
    // const getCategories = useQuery(GET_CATEGORIES);
    // const getBrands = useQuery(GET_BRANDS);
    const [updateCategoryMutation, { data, loading, error }] = useMutation(UPDATE_CATEGORY_BY_ID_MUTATION, {
        refetchQueries: [GET_CATEGORIES_FOR_ADMIN, GET_CATEGORY_BY_ID],
    });



    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCategoryData({ ...categoryData, [name]: value });
    };



    // handle submit to update the category
    const handleUpdateCategory = (event: FormEvent) => {
        event.preventDefault();
        const { _id, name, imageUrl, description } = categoryData;

        // updating category
        warningAlert('Yes, Update it!', () => (
            updateCategoryMutation({
                variables: {
                    id: _id,
                    info: {
                        name: name,
                        description: description,
                        imageUrl: imageUrl
                    },
                },
            }))
        );

        // Reset the input fields
        setCategoryData(categoryStateValue);
    };


    // set the input fields value
    useEffect(() => {
        if (getCategory?.data?.getCategoryById) {
            const { _id, name, description, imageUrl } = getCategory?.data?.getCategoryById;
            setCategoryData({
                _id,
                name,
                description,
                imageUrl
            });
        }
    }, [getCategory?.data?.getCategoryById]);


    // for notification
    useEffect(() => {
        // if category not updated
        if (error) errorAlert(error.message);

        // if category successfully updated
        if (data) successAlert(data?.updateCategoryById?.message);
    }, [data, error]);


    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Update Category</h2>
                    <form onSubmit={handleUpdateCategory}>

                        <TextInputField
                            name="name"
                            labelName="Name"
                            placeholder="Category Name"
                            value={categoryData.name}
                            onChange={handleInputChange}
                        />

                        <TextInputField
                            name="description"
                            labelName="description"
                            placeholder="description"
                            value={categoryData.description}
                            onChange={handleInputChange}
                        />

                        <TextInputField
                            name="imageUrl"
                            labelName="Image Url"
                            placeholder="Image Url"
                            value={categoryData.imageUrl}
                            onChange={handleInputChange}
                        />

                        <Button color='red' buttonType='submit' buttonClass='w-full'>Update Stock</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default UpdateStock;
