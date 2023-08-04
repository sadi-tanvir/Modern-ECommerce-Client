'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import MultiSelectInputField from '@/app/components/shared/MultiSelectInputField';
import SelectInputField from '@/app/components/shared/SelectInputField';
import TextInputField from '@/app/components/shared/TextInputField';
import { CREATE_PRODUCT_MUTATION } from '@/gql/mutations/product.mutations';
import { GET_BRANDS } from '@/gql/queries/brand.queries';
import { GET_CATEGORIES } from '@/gql/queries/category.queries';
import { useMutation, useQuery } from '@apollo/client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { warningAlert, successAlert, errorAlert } from "../../components/alert-functions/alert";



const AddNewProduct: React.FC = () => {
    const productStateValues = {
        name: '',
        description: '',
        unit: '',
        imageUrl: '',
        category: {
            id: '',
            name: '',
        },
        brand: {
            id: '',
            name: '',
        }
    }
    // state
    const [productData, setProductData] = useState(productStateValues);


    // gql
    const getCategories = useQuery(GET_CATEGORIES);
    const getBrands = useQuery(GET_BRANDS);
    const [createProductMutation, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
        // refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
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
    }




    // handle submit to create a new product
    const handleProductCreate = (event: FormEvent) => {
        event.preventDefault();
        const { name, description, unit, imageUrl, category, brand } = productData;

        // creating product
        warningAlert('Yes, Create it!', () => (
            createProductMutation({
                variables: {
                    info: {
                        name, description, unit, imageUrl,
                        category: { id: category.id, name: category.name },
                        brand: { id: brand.id, name: brand.name },
                    }
                }
            }))
        );
    };



    useEffect(() => {
        // if product not created
        if (error) errorAlert(error.message)

        // if product successfully created
        if (data) {
            // success alert
            successAlert(data?.createProduct?.message);

            // Reset the input fields
            setProductData(productStateValues);
        }
    }, [data, error]);



    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Product</h2>
                    <form onSubmit={handleProductCreate}>
                        <TextInputField
                            name="name"
                            labelName="Product Name"
                            placeholder="Product Name"
                            value={productData.name}
                            onChange={handleInputChange}
                            isRequired={true}
                        />
                        <TextInputField
                            name="description"
                            labelName="description"
                            placeholder="description"
                            value={productData.description}
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
                            // value={productData.unit}
                            onChange={handleSelectInputChange}
                            name="unit"
                            // currentValue="pcs"
                            labelName="Unit Type"
                        />

                        <MultiSelectInputField
                            options={getCategories?.data?.categories?.map((queries: { _id: string; name: string; }) => ({
                                label: queries.name,
                                value: { id: queries._id, name: queries.name }
                            }))}
                            // value={categoryInput}
                            onChange={handleMultiCategoryInputChange}
                            name="category"
                            labelName="Category"
                        />

                        <MultiSelectInputField
                            options={getBrands?.data?.brands?.map((queries: { _id: string; name: string; }) => ({
                                label: queries.name,
                                value: { id: queries._id, name: queries.name }
                            }))}
                            // value={categoryInput}
                            onChange={handleMultiCategoryInputChange}
                            name="brand"
                            labelName="Brand"
                        />

                        <Button color='red' buttonType='submit'>Add Product</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewProduct;
