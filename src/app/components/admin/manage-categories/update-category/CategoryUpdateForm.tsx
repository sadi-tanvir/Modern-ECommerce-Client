'use client'
import { errorAlert, successAlert, warningAlert } from '@/app/components/alert-functions/alert';
import Button from '@/app/components/shared/Button'
import TextInputField from '@/app/components/shared/TextInputField'
import { UPDATE_CATEGORY_BY_ID_MUTATION } from '@/gql/mutations/category.mutations';
import { GET_CATEGORIES_FOR_ADMIN, GET_CATEGORY_BY_ID } from '@/gql/queries/category.queries';
import { useMutation, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'


const CategoryUpdateForm = () => {
    
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

            <Button buttonType='submit' buttonClass='w-full bg-primary'>Update Stock</Button>
        </form>
    )
}

export default CategoryUpdateForm;