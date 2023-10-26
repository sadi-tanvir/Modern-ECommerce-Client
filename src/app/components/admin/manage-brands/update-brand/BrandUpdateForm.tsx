'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { errorAlert, successAlert, warningAlert } from '@/app/components/alert-functions/alert';
import Button from '@/app/components/shared/Button'
import TextInputField from '@/app/components/shared/TextInputField'
import { UPDATE_BRAND_BY_ID_MUTATION } from '@/gql/mutations/brand.mutations';
import { GET_BRANDS_FOR_ADMIN, GET_BRAND_BY_ID } from '@/gql/queries/brand.queries';
import { useMutation, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import SelectInputField from "../../../shared/SelectInputField";

type BrandTypes = {
    _id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    status: string;
    location: string;
}

const BrandUpdateForm = () => {
    // states
    const brandStateValues = {
        _id: '',
        name: '',
        description: '',
        email: '',
        phone: '',
        website: '',
        status: '',
        location: '',
    };
    const [brandData, setBrandData] = useState<BrandTypes>(brandStateValues);



    // navigation
    const searchParams = useSearchParams();
    const brandId = searchParams.get('brandId');



    // gql
    const brand = useQuery(GET_BRAND_BY_ID, {
        variables: {
            id: brandId
        }
    });
    const [updateBrandMutation, { data, loading, error }] = useMutation(UPDATE_BRAND_BY_ID_MUTATION, {
        refetchQueries: [GET_BRAND_BY_ID, GET_BRANDS_FOR_ADMIN],
    });



    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setBrandData({ ...brandData, [name]: value });
    };




    // getting the value of the select input field
    const handleSelectInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBrandData({ ...brandData, [name]: value });
    };




    // handle submit to create a new brand
    const handleUpdateBrand = (event: FormEvent) => {
        event.preventDefault();
        const { _id, name, description, email, phone, website, status, location } = brandData;

        // creating Brand
        warningAlert('Yes, Update it!', () => (
            updateBrandMutation({
                variables: {
                    id: _id,
                    info: {
                        name,
                        description,
                        email,
                        phone,
                        website,
                        status,
                        location
                    },
                },
            }))
        );

        // Reset the input fields
        setBrandData(brandStateValues);
    };


    // set the input fields value
    useEffect(() => {
        if (brand?.data?.getBrandById) {
            const { _id, name, description, email, phone, website, status, location } = brand?.data?.getBrandById;
            setBrandData({
                _id,
                name,
                description,
                email,
                phone,
                website,
                status,
                location
            });
        }
    }, [brand?.data?.getBrandById]);


    // for notification
    useEffect(() => {
        // if brand not created
        if (error) errorAlert(error.message);

        // if brand successfully created
        if (data) successAlert(data?.updateBrandById?.message);
    }, [data, error]);

    return (
        <form onSubmit={handleUpdateBrand}>
            <TextInputField
                name="name"
                labelName="Name"
                placeholder="Brand Name"
                value={brandData.name}
                onChange={handleInputChange}
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
                labelName="email"
                placeholder="email"
                value={brandData.email}
                onChange={handleInputChange}
            />

            <TextInputField
                name="phone"
                labelName="phone"
                placeholder="phone"
                value={brandData.phone}
                onChange={handleInputChange}
            />

            <TextInputField
                name="website"
                labelName="website"
                placeholder="website"
                value={brandData.website}
                onChange={handleInputChange}
            />

            <SelectInputField
                options={[
                    { label: 'active', value: 'active' },
                    { label: 'inactive', value: 'inactive' },
                ]}
                onChange={handleSelectInputChange}
                name="status"
                currentValue={brandData.status}
                labelName="Brand Status"
            />


            <TextInputField
                name="location"
                labelName="location"
                placeholder="location"
                value={brandData.location}
                onChange={handleInputChange}
            />

            <Button buttonType='submit' buttonClass='w-full bg-primary'>Update Brand </Button>
        </form>
    )
}

export default BrandUpdateForm