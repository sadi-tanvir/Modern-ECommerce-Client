'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { errorAlert, successAlert, warningAlert } from '@/app/components/alert-functions/alert';
import TextInputField from '@/app/components/shared/TextInputField';
import { UPDATE_STOCK_MUTATION } from '@/gql/mutations/stock.mutations';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_CATEGORIES } from '@/gql/queries/category.queries';
import { GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCK_WITH_DETAILS_BY_ID } from '@/gql/queries/stock.queries';
import { useMutation, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import SelectInputField from "../../../shared/SelectInputField";
import MultiSelectInputField from '@/app/components/shared/MultiSelectInputField';
import Button from '@/app/components/shared/Button';

const UpdateStockForm = () => {
    const stockStateValues = {
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
    const [stockData, setStockData] = useState(stockStateValues);



    // navigation
    const searchParams = useSearchParams();
    const stockId = searchParams.get('stockId');



    // gql
    const getStockWithDetail = useQuery(GET_STOCK_WITH_DETAILS_BY_ID, {
        variables: {
            id: stockId
        }
    });
    const getCategories = useQuery(GET_CATEGORIES);
    const getBrands = useQuery(GET_BRANDS);
    const [updateStockMutation, { data, loading, error }] = useMutation(UPDATE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCK_WITH_DETAILS_BY_ID],
    });



    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setStockData({ ...stockData, [name]: value });
    };




    // getting the value of the select input field
    const handleSelectInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStockData({ ...stockData, [name]: value });
    };




    // getting the value of the multi select input field
    const handleMultiCategoryInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setStockData({ ...stockData, [e.target.name]: JSON.parse(e.target.value) })
    };




    // handle submit to create a new stock
    const handleUpdateStock = (event: FormEvent) => {
        event.preventDefault();
        const { _id, name, unit, imageUrl, description, discount, price, quantity, status, category, brand } = stockData;

        // creating stock
        warningAlert('Yes, Update it!', () => (
            updateStockMutation({
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
                        sellCount: Number(stockData.sellCount),
                        status: status,
                        rating: Number(stockData.rating),
                        isTopSale: JSON.parse(stockData.isTopSale),
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
        setStockData(stockStateValues);
    };


    // set the input fields value
    useEffect(() => {
        if (getStockWithDetail?.data?.stockWithDetailsById) {
            const { _id, name, description, unit, imageUrl, price, discount, quantity, isTopSale, rating, sellCount, status, category, brand } = getStockWithDetail?.data?.stockWithDetailsById;
            setStockData({
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
    }, [getStockWithDetail?.data?.stockWithDetailsById]);


    // for notification
    useEffect(() => {
        // if stock not created
        if (error) errorAlert(error.message);

        // if stock successfully created
        if (data) successAlert(data?.updateStockById?.message);
    }, [data, error]);

    return (
        <form onSubmit={handleUpdateStock}>
            <TextInputField
                name="name"
                labelName="Name"
                placeholder="Product Name"
                value={stockData.name}
                onChange={handleInputChange}
            />

            <TextInputField
                name="description"
                labelName="description"
                placeholder="description"
                value={stockData.description}
                onChange={handleInputChange}
            />

            <SelectInputField
                options={[
                    { label: 'kg', value: 'kg' },
                    { label: 'litre', value: 'litre' },
                    { label: 'pcs', value: 'pcs' },
                    { label: 'bag', value: 'bag' },
                ]}
                // value={stockData.unit}
                onChange={handleSelectInputChange}
                name="unit"
                currentValue={stockData.unit}
                labelName="Unit Type"
            />

            <TextInputField
                name="imageUrl"
                labelName="Image Url"
                placeholder="Image Url"
                value={stockData.imageUrl}
                onChange={handleInputChange}
            />

            <TextInputField
                name="price"
                labelName="price"
                placeholder="price"
                inputType='number'
                value={stockData.price}
                onChange={handleInputChange}
            />

            <TextInputField
                name="discount"
                labelName="discount"
                placeholder="discount"
                inputType='number'
                value={stockData.discount}
                onChange={handleInputChange}
            />

            <TextInputField
                name="quantity"
                labelName="quantity"
                placeholder="quantity"
                inputType='number'
                value={stockData.quantity}
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
                // value={stockData.unit}
                onChange={handleSelectInputChange}
                name="rating"
                currentValue={stockData.rating}
                labelName="Rating"
            />

            <SelectInputField
                options={[
                    { label: 'yes', value: 'true' },
                    { label: 'no', value: 'false' },
                ]}
                // value={stockData.unit}
                onChange={handleSelectInputChange}
                name="isTopSale"
                currentValue={stockData.isTopSale}
                labelName="Top Sale"
            />

            <TextInputField
                name="sellCount"
                labelName="Total Sold"
                placeholder="Total Sold"
                value={stockData.sellCount}
                onChange={handleInputChange}
                isRequired={true}
            />

            <SelectInputField
                options={[
                    { label: 'in-stock', value: 'in-stock' },
                    { label: 'out-of-stock', value: 'out-of-stock' },
                    { label: 'discontinued', value: 'discontinued' },
                ]}
                // value={stockData.unit}
                onChange={handleSelectInputChange}
                name="status"
                currentValue={stockData.status}
                labelName="Stock Status"
            />

            <MultiSelectInputField
                options={getCategories?.data?.categories?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                value={stockData.category}
                onChange={handleMultiCategoryInputChange}
                name="category"
                labelName="Category"
            />

            <MultiSelectInputField
                options={getBrands?.data?.brands?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                value={stockData.brand}
                onChange={handleMultiCategoryInputChange}
                name="brand"
                labelName="Brand"
            />

            <Button buttonType='submit' buttonClass='bg-primary w-full'>Update Stock</Button>
        </form>
    );
};

export default UpdateStockForm;