'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { errorAlert, successAlert, warningAlert } from '@/app/components/alert-functions/alert';
import TextInputField from '@/app/components/shared/TextInputField';
import { UPDATE_PRODUCT_MUTATION } from '@/gql/mutations/product.mutations';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_CATEGORIES } from '@/gql/queries/category.queries';
import { GET_PRODUCTS_FOR_ADMINISTRATOR, GET_PRODUCT_WITH_DETAILS_BY_ID } from '@/gql/queries/product.queries';
import { useMutation, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import SelectInputField from "../../../shared/SelectInputField";
import MultiSelectInputField from '@/app/components/shared/MultiSelectInputField';
import Button from '@/app/components/shared/Button';

const UpdateProductForm = () => {
    const productStateValues = {
        _id: '',
        name: '',
        description: '',
        unit: '',
        imageUrl: '',
        price: '',
        discount: '',
        quantity: '',
        sellCount: '',
        rating: '',
        isTopSale: '',
        status: '',
        category: {
            id: '',
            name: '',
        },
        brand: {
            id: '',
            name: '',
        }
    };
    // states
    const [productData, setProductData] = useState(productStateValues);



    // navigation
    const searchParams = useSearchParams();
    const productId = searchParams.get('stockId');



    // gql
    const getProductWithDetail = useQuery(GET_PRODUCT_WITH_DETAILS_BY_ID, {
        variables: {
            id: productId
        }
    });
    const getCategories = useQuery(GET_CATEGORIES);
    const getBrands = useQuery(GET_BRANDS);
    const [updateProductMutation, { data, loading, error }] = useMutation(UPDATE_PRODUCT_MUTATION, {
        refetchQueries: [GET_PRODUCTS_FOR_ADMINISTRATOR, GET_PRODUCT_WITH_DETAILS_BY_ID],
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
    const handleUpdateProduct = (event: FormEvent) => {
        event.preventDefault();
        const { _id, name, unit, imageUrl, description, discount, price, quantity, status, category, brand } = productData;

        // creating product
        warningAlert('Yes, Update it!', () => (
            updateProductMutation({
                variables: {
                    id: _id,
                    info: {
                        name: name,
                        description: description,
                        unit: unit,
                        imageUrl: imageUrl,
                        price: Number(price),
                        discount: Number(discount),
                        quantity: Number(quantity),
                        sellCount: Number(productData.sellCount),
                        status: status,
                        rating: Number(productData.rating),
                        isTopSale: JSON.parse(productData.isTopSale),
                        category: {
                            id: category.id,
                            name: category.name,
                        },
                        brand: {
                            id: brand.id,
                            name: brand.name,
                        },
                    },
                },
            }))
        );

        // Reset the input fields
        setProductData(productStateValues);
    };


    // set the input fields value
    useEffect(() => {
        if (getProductWithDetail?.data?.productWithDetailsById) {
            const { _id, name, description, unit, imageUrl, price, discount, quantity, isTopSale, rating, sellCount, status, category, brand } = getProductWithDetail?.data?.productWithDetailsById;
            setProductData({
                _id: _id,
                name: name,
                description: description,
                unit: unit,
                imageUrl: imageUrl,
                price: price,
                discount: discount,
                quantity: quantity,
                sellCount: sellCount,
                status: status,
                rating: rating,
                isTopSale: isTopSale,
                category: {
                    id: category.id._id,
                    name: category.id.name,
                },
                brand: {
                    id: brand.id._id,
                    name: brand.id.name,
                },
            });
        }
    }, [getProductWithDetail?.data?.productWithDetailsById]);


    // for notification
    useEffect(() => {
        // if product not created
        if (error) errorAlert(error.message);

        // if product successfully created
        if (data) successAlert(data?.updateProductById?.message);
    }, [data, error]);

    return (
        <form onSubmit={handleUpdateProduct}>
            <TextInputField
                name="name"
                labelName="Name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleInputChange}
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
                    { label: 'kg', value: 'kg' },
                    { label: 'litre', value: 'litre' },
                    { label: 'pcs', value: 'pcs' },
                    { label: 'bag', value: 'bag' },
                ]}
                // value={productData.unit}
                onChange={handleSelectInputChange}
                name="unit"
                currentValue={productData.unit}
                labelName="Unit Type"
            />

            <TextInputField
                name="imageUrl"
                labelName="Image Url"
                placeholder="Image Url"
                value={productData.imageUrl}
                onChange={handleInputChange}
            />

            <TextInputField
                name="price"
                labelName="price"
                placeholder="price"
                inputType='number'
                value={productData.price}
                onChange={handleInputChange}
            />

            <TextInputField
                name="discount"
                labelName="discount"
                placeholder="discount"
                inputType='number'
                value={productData.discount}
                onChange={handleInputChange}
            />

            <TextInputField
                name="quantity"
                labelName="quantity"
                placeholder="quantity"
                inputType='number'
                value={productData.quantity}
                onChange={handleInputChange}
            />

            <SelectInputField
                options={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                ]}
                // value={productData.unit}
                onChange={handleSelectInputChange}
                name="rating"
                currentValue={productData.rating}
                labelName="Rating"
            />

            <SelectInputField
                options={[
                    { label: 'yes', value: 'true' },
                    { label: 'no', value: 'false' },
                ]}
                // value={productData.unit}
                onChange={handleSelectInputChange}
                name="isTopSale"
                currentValue={productData.isTopSale}
                labelName="Top Sale"
            />

            <TextInputField
                name="sellCount"
                labelName="Total Sold"
                placeholder="Total Sold"
                value={productData.sellCount}
                onChange={handleInputChange}
                isRequired={true}
            />

            <SelectInputField
                options={[
                    { label: 'in-stock', value: 'in-stock' },
                    { label: 'out-of-stock', value: 'out-of-stock' },
                    { label: 'discontinued', value: 'discontinued' },
                ]}
                // value={productData.unit}
                onChange={handleSelectInputChange}
                name="status"
                currentValue={productData.status}
                labelName="Product Status"
            />

            <MultiSelectInputField
                options={getCategories?.data?.categories?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                value={productData.category}
                onChange={handleMultiCategoryInputChange}
                name="category"
                labelName="Category"
            />

            <MultiSelectInputField
                options={getBrands?.data?.brands?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                value={productData.brand}
                onChange={handleMultiCategoryInputChange}
                name="brand"
                labelName="Brand"
            />

            <Button buttonType='submit' buttonClass='bg-primary w-full'>Update Product</Button>
        </form>
    );
};

export default UpdateProductForm;