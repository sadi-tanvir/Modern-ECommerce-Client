'use client'
import AdminDashboardLayout from '@/app/components/admin/AdminDashboardLayout';
import Button from '@/app/components/shared/Button';
import TextInputField from '@/app/components/shared/TextInputField';
import { CREATE_BRAND_MUTATION } from '@/gql/mutations/brand.mutations';
import { useMutation } from '@apollo/client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { warningAlert, successAlert, errorAlert } from "../../components/alert-functions/alert"


const AddNewBrand: React.FC = () => {
    const brandStateValues = {
        name: '',
        description: '',
        email: '',
        phone: '',
        website: '',
        location: ''
    }
    // state
    const [brandData, setBrandData] = useState(brandStateValues);




    // gql
    const [createBrandMutation, { data, loading, error }] = useMutation(CREATE_BRAND_MUTATION, {
        // refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });





    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setBrandData({ ...brandData, [name]: value });
    };




    // handle submit to create a new brand
    const handleBrandCreate = (event: FormEvent) => {
        event.preventDefault();
        const { name, description, email, phone, website, location } = brandData;

        // creating brand
        warningAlert('Yes, Create it!', () => (
            createBrandMutation({
                variables: {
                    info: { name, description, email, phone, website, location }
                }
            }))
        );
    };




    useEffect(() => {
        // if brand not created
        if (error) errorAlert(error.message)

        // if brand successfully created
        if (data) {
            // success alert
            successAlert(data?.createBrand?.message);

            // Reset the input fields
            setBrandData(brandStateValues);
        }
    }, [data, error]);


    return (
        <AdminDashboardLayout>
            <div className="w-full flex justify-center items-start mt-20  md:min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create New Brand</h2>
                    <form onSubmit={handleBrandCreate}>
                        <TextInputField
                            name="name"
                            labelName="Brand Name"
                            placeholder="Brand Name"
                            value={brandData.name}
                            onChange={handleInputChange}
                            isRequired={true}
                        />

                        <TextInputField
                            name="description"
                            labelName="description"
                            placeholder="description"
                            value={brandData.description}
                            onChange={handleInputChange}
                        />

                        <TextInputField
                            name="email"
                            labelName="Email"
                            placeholder="Company Email"
                            value={brandData.email}
                            onChange={handleInputChange}
                            inputType='email'
                            isRequired={true}
                        />

                        <TextInputField
                            name="phone"
                            labelName="Phone"
                            placeholder="Company Phone"
                            value={brandData.phone}
                            onChange={handleInputChange}
                            isRequired={true}
                        />

                        <TextInputField
                            name="website"
                            labelName="Website"
                            placeholder="Company Website"
                            value={brandData.website}
                            onChange={handleInputChange}
                            isRequired={true}
                        />

                        <TextInputField
                            name="location"
                            labelName="Location"
                            placeholder="Company Location"
                            value={brandData.location}
                            onChange={handleInputChange}
                            isRequired={true}
                        />

                        <Button color='red' buttonType='submit'>Add Brand</Button>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AddNewBrand;
