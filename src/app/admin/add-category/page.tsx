'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import TextInputField from '@/app/components/shared/TextInputField';
import { CREATE_CATEGORY_MUTATION } from '@/gql/mutations/category.mutations';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useMutation } from '@apollo/client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';



const AddNewCategory: React.FC = () => {
    // state
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    });

    // redux
    const { warningAlert, successAlert, errorAlert } = useAppSelector(state => state.globalReducer);

    // gql
    const [createCategoryMutation, { data, loading, error }] = useMutation(CREATE_CATEGORY_MUTATION, {
        // refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });



    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCategoryData({ ...categoryData, [name]: value });
    };



    // handle submit to create a new product
    const handleCategoryCreate = (event: FormEvent) => {
        event.preventDefault();
        const { name, description } = categoryData;

        // creating product
        warningAlert('Yes, Create it!', () => (
            createCategoryMutation({
                variables: {
                    info: {
                        name,
                        description
                    }
                }
            }))
        );

        // Reset the input fields
        setCategoryData({
            name: '',
            description: '',
        });
    };





    useEffect(() => {
        // if product not created
        if (error) errorAlert(error.message)

        // if product successfully created
        if (data) successAlert(data?.createCategory?.message)
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

                        <Button color='red' buttonType='submit'>Add Category</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewCategory;
