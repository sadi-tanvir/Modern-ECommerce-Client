'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import SelectInputField from '../../shared/SelectInputField';
import TextInputField from '../../shared/TextInputField';
import Button from '../../shared/Button';
import MultiSelectInputField from '../../shared/MultiSelectInputField';
import { errorAlert, successAlert, warningAlert } from '../../alert-functions/alert';
import { GET_PRODUCTS_FOR_ADMINISTRATOR } from '@/gql/queries/product.queries';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '@/gql/mutations/product.mutations';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_CATEGORIES } from '@/gql/queries/category.queries';

export type ProductInfo = {
    _id: string;
    name: string;
    imageUrl: string;
    unit: string;
    category: {
        id: {
            _id: string;
            name: string;
        };
    };
    brand: {
        id: {
            _id: string;
            name: string;
        };
    };
};

const ProductAddForm = () => {
    const productStateValues = {
        name: '',
        imageUrl: '',
        unit: '',
        category: {
            id: '',
            name: '',
        },
        brand: {
            id: '',
            name: '',
        },
        description: '',
        status: '',
        price: '',
        discount: '',
        quantity: '',
    };
    // states
    const [productData, setProductData] = useState(productStateValues);



    // gql
    const getCategories = useQuery(GET_CATEGORIES);
    const getBrands = useQuery(GET_BRANDS);
    const [createProductMutation, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
        refetchQueries: [GET_PRODUCTS_FOR_ADMINISTRATOR],
    });





    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };




    // getting the value of the select input field
    const handleSelectInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };




    // getting the value of the multi select input field
    const handleMultiCategoryInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setProductData({ ...productData, [e.target.name]: JSON.parse(e.target.value) })
    };




    // handle submit to create a new product
    const handleCreateProduct = (event: FormEvent) => {
        event.preventDefault();
        const { description, discount, price, quantity, status } = productData;
        // creating product
        warningAlert('Yes, Create it!', () => (
            createProductMutation({
                variables: {
                    info: {
                        name: productData.name,
                        description: description,
                        unit: productData.unit,
                        imageUrl: productData.imageUrl,
                        price: Number(price),
                        discount: Number(discount),
                        quantity: Number(quantity),
                        status: status,
                        category: {
                            id: productData.category.id,
                            name: productData.category.name,
                        },
                        brand: {
                            id: productData.brand.id,
                            name: productData.brand.name,
                        },
                    },
                },
            }))
        );

        // Reset the input fields
        setProductData(productStateValues);
    };





    // for notification
    useEffect(() => {
        // if product not created
        if (error) errorAlert(error.message);

        // if product successfully created
        if (data) successAlert(data?.createProduct?.message);
    }, [data, error]);


    return (
        <form onSubmit={handleCreateProduct}>
            <TextInputField
                name="name"
                labelName="Product Name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="imageUrl"
                labelName="Image URL"
                placeholder="Image URL"
                value={productData.imageUrl}
                onChange={handleInputChange}
            />

            <SelectInputField
                options={[
                    { label: 'kg', value: 'kg' },
                    { label: 'litre', value: 'litre' },
                    { label: 'pcs', value: 'pcs' },
                    { label: 'bag', value: 'bag' },
                ]}
                onChange={handleSelectInputChange}
                name="unit"
                currentValue={productData.unit}
                labelName="Unit Type"
            />

            <MultiSelectInputField
                options={getCategories?.data?.categories?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                currentValue={productData.category}
                onChange={handleMultiCategoryInputChange}
                name="category"
                labelName="Category"
            />

            <MultiSelectInputField
                options={getBrands?.data?.brands?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                currentValue={productData.brand}
                onChange={handleMultiCategoryInputChange}
                name="brand"
                labelName="Brand"
            />

            <TextInputField
                name="description"
                labelName="description"
                placeholder="description"
                value={productData.description}
                onChange={handleInputChange}
            />

            <SelectInputField
                options={[
                    { label: 'in-stock', value: 'in-stock' },
                    { label: 'out-of-stock', value: 'out-of-stock' },
                    { label: 'discontinued', value: 'discontinued' },
                ]}
                onChange={handleSelectInputChange}
                name="status"
                currentValue={productData.status}
                labelName="Product Status"
            />

            <TextInputField
                name="price"
                labelName="Product price"
                placeholder="Product price"
                value={productData.price}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="discount"
                labelName="discount percentage"
                placeholder="discount percentage"
                value={productData.discount}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="quantity"
                labelName="available quantity"
                placeholder="available quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                isRequired={true}
            />

            <Button buttonType='submit' buttonClass='w-full bg-danger'>Add Product</Button>
        </form>
    )
}

export default ProductAddForm