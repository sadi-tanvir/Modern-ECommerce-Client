'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import SelectInputField from '../../shared/SelectInputField';
import TextInputField from '../../shared/TextInputField';
import Button from '../../shared/Button';
import MultiSelectInputField from '../../shared/MultiSelectInputField';
import { errorAlert, successAlert, warningAlert } from '../../alert-functions/alert';
import { GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCKS_NAMES } from '@/gql/queries/stock.queries';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STOCK_MUTATION } from '@/gql/mutations/stock.mutations';
import { GET_PRODUCTS_NAME_AND_ID } from '@/gql/queries/product.queries';
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

const StockAddForm = () => {
    const stockStateValues = {
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
    const [stockData, setStockData] = useState(stockStateValues);
    const [restProducts, setRestProducts] = useState<ProductInfo[]>([])



    // gql
    const stocks = useQuery(GET_STOCKS_NAMES);
    const getCategories = useQuery(GET_CATEGORIES);
    const getBrands = useQuery(GET_BRANDS);
    const getProductsNameAndId = useQuery(GET_PRODUCTS_NAME_AND_ID);
    const [createStockMutation, { data, loading, error }] = useMutation(CREATE_STOCK_MUTATION, {
        refetchQueries: [GET_STOCKS_NAMES, GET_STOCKS_FOR_ADMINISTRATOR],
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
    const handleCreateStock = (event: FormEvent) => {
        event.preventDefault();
        const { description, discount, price, quantity, status } = stockData;

        // creating stock
        warningAlert('Yes, Create it!', () => (
            createStockMutation({
                variables: {
                    info: {
                        name: stockData.name,
                        description: description,
                        unit: stockData.unit,
                        imageUrl: stockData.imageUrl,
                        price: Number(price),
                        discount: Number(discount),
                        quantity: Number(quantity),
                        status: status,
                        category: {
                            id: stockData.category.id,
                            name: stockData.category.name,
                        },
                        brand: {
                            id: stockData.brand.id,
                            name: stockData.brand.name,
                        },
                    },
                },
            }))
        );

        // Reset the input fields
        setStockData(stockStateValues);
    };




    // filtering the products which are not added into the stock list yet.
    useEffect(() => {
        if ((getProductsNameAndId?.data?.products.length > 0) && (stocks?.data?.stocks.length > 0)) {
            let tempProductsList = [];
            for (let i = 0; i < getProductsNameAndId.data.products.length; i++) {
                let temp = false;

                for (let j = 0; j < stocks.data.stocks.length; j++) {
                    if (getProductsNameAndId.data.products[i].name.toLowerCase() == stocks.data.stocks[j].name.toLowerCase()) {
                        temp = true;
                        break;
                    };
                };

                if (!temp) {
                    tempProductsList.push(getProductsNameAndId?.data?.products[i])
                };
            };

            // push products into the state
            setRestProducts(tempProductsList);
        };

    }, [stocks?.data?.stocks, getProductsNameAndId?.data?.products]);





    // for notification
    useEffect(() => {
        // if stock not created
        if (error) errorAlert(error.message);

        // if stock successfully created
        if (data) successAlert(data?.createStock?.message);
    }, [data, error]);


    return (
        <form onSubmit={handleCreateStock}>
            <TextInputField
                name="name"
                labelName="Product Name"
                placeholder="Product Name"
                value={stockData.name}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="imageUrl"
                labelName="Image URL"
                placeholder="Image URL"
                value={stockData.imageUrl}
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
                currentValue={stockData.unit}
                labelName="Unit Type"
            />

            <MultiSelectInputField
                options={getCategories?.data?.categories?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                currentValue={stockData.category}
                onChange={handleMultiCategoryInputChange}
                name="category"
                labelName="Category"
            />

            <MultiSelectInputField
                options={getBrands?.data?.brands?.map((queries: { _id: string; name: string; }) => ({
                    label: queries.name,
                    value: { id: queries._id, name: queries.name }
                }))}
                currentValue={stockData.brand}
                onChange={handleMultiCategoryInputChange}
                name="brand"
                labelName="Brand"
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
                    { label: 'in-stock', value: 'in-stock' },
                    { label: 'out-of-stock', value: 'out-of-stock' },
                    { label: 'discontinued', value: 'discontinued' },
                ]}
                onChange={handleSelectInputChange}
                name="status"
                currentValue={stockData.status}
                labelName="Stock Status"
            />

            <TextInputField
                name="price"
                labelName="Product price"
                placeholder="Product price"
                value={stockData.price}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="discount"
                labelName="discount percentage"
                placeholder="discount percentage"
                value={stockData.discount}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="quantity"
                labelName="available quantity"
                placeholder="available quantity"
                value={stockData.quantity}
                onChange={handleInputChange}
                isRequired={true}
            />

            <Button buttonType='submit' buttonClass='w-full bg-danger'>Add Stock</Button>
        </form>
    )
}

export default StockAddForm