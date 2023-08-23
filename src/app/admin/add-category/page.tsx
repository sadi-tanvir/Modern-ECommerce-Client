'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import TextInputField from '@/app/components/shared/TextInputField';
import { CREATE_CATEGORY_MUTATION } from '@/gql/mutations/category.mutations';
import { useMutation } from '@apollo/client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { warningAlert, successAlert, errorAlert } from "../../components/alert-functions/alert"


const AddNewCategory: React.FC = () => {
    const categoryStateValues = {
        name: '',
        imageUrl: '',
        description: '',
    }
    // state
    const [categoryData, setCategoryData] = useState(categoryStateValues);




    // gql
    const [createCategoryMutation, { data, loading, error }] = useMutation(CREATE_CATEGORY_MUTATION, {
        // refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });




    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCategoryData({ ...categoryData, [name]: value });
    };




    // handle submit to create a new category
    const handleCategoryCreate = (event: FormEvent) => {
        event.preventDefault();
        const { name, imageUrl, description } = categoryData;

        // creating category
        warningAlert('Yes, Create it!', () => (
            createCategoryMutation({
                variables: {
                    info: {
                        name,
                        imageUrl,
                        description,
                    }
                }
            }))
        );
    };




    useEffect(() => {
        // if category not created
        if (error) errorAlert(error.message)

        // if category successfully created
        if (data) {
            // success alert
            successAlert(data?.createCategory?.message);
            // Reset the input fields
            setCategoryData(categoryStateValues);
        }
    }, [data, error]);



    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Category</h2>
                    <form onSubmit={handleCategoryCreate}>
                        <TextInputField
                            name="name"
                            labelName="Category Name"
                            placeholder="Category Name"
                            value={categoryData.name}
                            onChange={handleInputChange}
                            isRequired={true}
                        />
                        <TextInputField
                            name="description"
                            labelName="description"
                            placeholder="description"
                            value={categoryData.description}
                            onChange={handleInputChange}
                            isRequired={true}
                        />

                        <TextInputField
                            name="imageUrl"
                            labelName="Image Url"
                            placeholder="Image Url"
                            value={categoryData.imageUrl}
                            onChange={handleInputChange}
                            isRequired={true}
                        />

                        <Button color='red' buttonType='submit'  buttonClass='w-full'>Add Category</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewCategory;
