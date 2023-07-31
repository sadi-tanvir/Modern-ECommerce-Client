'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import MultiSelectInputField from '@/app/components/shared/MultiSelectInputField';
import SelectInputField from '@/app/components/shared/SelectInputField';
import TextInputField from '@/app/components/shared/TextInputField';
import { CREATE_PRODUCT_MUTATION } from '@/gql/mutations/product.mutations';
import { CREATE_STOCK_MUTATION } from '@/gql/mutations/stock.mutations';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_CATEGORIES } from '@/gql/queries/category.queries';
import { GET_PRODUCTS_NAME_AND_ID } from '@/gql/queries/product.queries';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useMutation, useQuery } from '@apollo/client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

export type ProductInfo = {
    _id: string;
    name: string;
    imageUrl: string;
    unit: string;
    category: {
        id:
        {
            _id: string;
            name: string;
        }
    };
    brand: {
        id:
        {
            _id: string;
            name: string;
        }
    }
}

const AddNewProduct: React.FC = () => {
    // state
    const [stockData, setStockData] = useState({
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
        // productId: '',
        // name: '',
        description: '',
        // unit: '',
        status: '',
        // imageUrl: '',
        price: '',
        discount: '',
        quantity: '',
        // category: {
        //     id: '',
        //     name: '',
        // },
        // brand: {
        //     id: '',
        //     name: '',
        // }
    });

    // redux
    const { warningAlert, successAlert, errorAlert } = useAppSelector(state => state.globalReducer);

    // gql
    const getProductsNameAndId = useQuery(GET_PRODUCTS_NAME_AND_ID);
    const getCategories = useQuery(GET_CATEGORIES);
    const getBrands = useQuery(GET_BRANDS);
    const [createStockMutation, { data, loading, error }] = useMutation(CREATE_STOCK_MUTATION, {
        // refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });

    // console.warn('getProductsNameAndId - si',getProductsNameAndId?.data?.products);


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
    }




    // handle submit to create a new product
    const handleProductCreate = (event: FormEvent) => {
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
                        }
                    }

                }
            }))
        );

        // Reset the input fields
        setStockData({
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
            // productId: '',
            // name: '',
            description: '',
            // unit: '',
            status: '',
            // imageUrl: '',
            price: '',
            discount: '',
            quantity: '',
            // category: {
            //     id: '',
            //     name: '',
            // },
            // brand: {
            //     id: '',
            //     name: '',
            // }
        });
    };





    useEffect(() => {
        // if product not created
        if (error) errorAlert(error.message)

        // if product successfully created
        if (data) successAlert(data?.createStock?.message)
    }, [data, error]);

    console.warn('stockData', stockData);


    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Product</h2>
                    <form onSubmit={handleProductCreate}>
                        <MultiSelectInputField
                            options={getProductsNameAndId?.data?.products.map((product: ProductInfo) => ({
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
                            // value={categoryInput}
                            onChange={handleMultiCategoryInputChange}
                            name="productInfo"
                            labelName="Product Information"
                        />

                        {/* <SelectInputField
                            options={getProductsNameAndId?.data?.products.map((product: { _id: string; name: string; }) => ({ label: product.name, value: product._id }))}
                            // value={stockData.unit}
                            onChange={handleSelectInputChange}
                            name="productId"
                            // currentValue="pcs"
                            labelName="Product ID"
                        /> */}

                        {/* <SelectInputField
                            options={getProductsNameAndId?.data?.products.map((product: { _id: string; name: string; }) => ({ label: product.name, value: product.name }))}
                            // value={stockData.unit}
                            onChange={handleSelectInputChange}
                            name="name"
                            // currentValue="pcs"
                            labelName="Product Name"
                        /> */}

                        <TextInputField
                            name="description"
                            labelName="description"
                            placeholder="description"
                            value={stockData.description}
                            onChange={handleInputChange}
                        />

                        {/* <SelectInputField
                            options={[
                                { label: 'kg', value: 'kg' },
                                { label: 'litre', value: 'litre' },
                                { label: 'pcs', value: 'pcs' },
                                { label: 'bag', value: 'bag' },
                            ]}
                            // value={stockData.unit}
                            onChange={handleSelectInputChange}
                            name="unit"
                            // currentValue="pcs"
                            labelName="Unit Type"
                        /> */}

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

                        {/* <SelectInputField
                            options={getProductsNameAndId?.data?.products.map((product: { _id: string; name: string; imageUrl: string; }) => ({ label: product.name, value: product.imageUrl }))}
                            // value={stockData.unit}
                            onChange={handleSelectInputChange}
                            name="imageUrl"
                            // currentValue="pcs"
                            labelName="Product Image"
                        /> */}

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

                        {/* <MultiSelectInputField
                            options={getCategories?.data?.categories?.map((queries: { _id: string; name: string; }) => ({
                                label: queries.name,
                                value: { id: queries._id, name: queries.name }
                            }))}
                            // value={categoryInput}
                            onChange={handleMultiCategoryInputChange}
                            name="category"
                            labelName="Category"
                        /> */}

                        {/* <MultiSelectInputField
                            options={getBrands?.data?.brands?.map((queries: { _id: string; name: string; }) => ({
                                label: queries.name,
                                value: { id: queries._id, name: queries.name }
                            }))}
                            // value={categoryInput}
                            onChange={handleMultiCategoryInputChange}
                            name="brand"
                            labelName="Brand"
                        /> */}

                        <Button color='red' buttonType='submit'>Add Product</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewProduct;
