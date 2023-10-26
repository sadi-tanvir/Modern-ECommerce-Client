'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Button from '../../shared/Button'
import TextInputField from '../../shared/TextInputField'
import { errorAlert, successAlert, warningAlert } from '../../alert-functions/alert'
import { CREATE_CATEGORY_MUTATION } from '@/gql/mutations/category.mutations'
import { useMutation } from '@apollo/client'

const CategoryAddForm = () => {
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

            <Button buttonType='submit' buttonClass='w-full bg-danger'>Add Category</Button>
        </form>
    )
}

export default CategoryAddForm