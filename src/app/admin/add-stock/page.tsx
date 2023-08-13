'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import MultiSelectInputField from '@/app/components/shared/MultiSelectInputField';
import SelectInputField from '@/app/components/shared/SelectInputField';
import TextInputField from '@/app/components/shared/TextInputField';
import { CREATE_STOCK_MUTATION } from '@/gql/mutations/stock.mutations';
import { GET_PRODUCTS_NAME_AND_ID } from '@/gql/queries/product.queries';
import { useMutation, useQuery } from '@apollo/client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { warningAlert, successAlert, errorAlert } from "../../components/alert-functions/alert";
import { GET_STOCKS_FOR_ADMINISTRATOR, GET_STOCKS_NAMES } from '@/gql/queries/stock.queries';

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

const AddNewStock: React.FC = () => {
    const stockStateValues = {
        productInfo: {
            productId: '',
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
            }
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
        const { productInfo, description, discount, price, quantity, status } = stockData;

        // creating stock
        warningAlert('Yes, Create it!', () => (
            createStockMutation({
                variables: {
                    info: {
                        productId: productInfo.productId,
                        name: productInfo.name,
                        description: description,
                        unit: productInfo.unit,
                        imageUrl: productInfo.imageUrl,
                        price: Number(price),
                        discount: Number(discount),
                        quantity: Number(quantity),
                        status: status,
                        category: {
                            id: productInfo.category.id,
                            name: productInfo.category.name,
                        },
                        brand: {
                            id: productInfo.brand.id,
                            name: productInfo.brand.name,
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
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Stock</h2>
                    <form onSubmit={handleCreateStock}>
                        <MultiSelectInputField
                            options={restProducts.map((product: ProductInfo) => ({
                                label: product.name,
                                value: {
                                    productId: product._id,
                                    name: product.name,
                                    imageUrl: product.imageUrl,
                                    unit: product.unit,
                                    category: {
                                        id: product.category.id._id,
                                        name: product.category.id.name,
                                    },
                                    brand: {
                                        id: product.brand.id._id,
                                        name: product.brand.id.name,
                                    }
                                }
                            }))}
                            onChange={handleMultiCategoryInputChange}
                            name="productInfo"
                            labelName="Product Information"
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
                            // value={stockData.unit}
                            onChange={handleSelectInputChange}
                            name="status"
                            // currentValue="pcs"
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

                        <Button color='red' buttonType='submit'>Add Stock</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewStock;
