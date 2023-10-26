'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextInputField from '../../shared/TextInputField'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useMutation } from '@apollo/client';
import { errorAlert, successAlert, warningAlert } from '../../alert-functions/alert';
import SelectInputField from "../../../components/shared/SelectInputField";
import { UPDATE_OWNER_INFO_MUTATION } from '@/gql/mutations/userAuthMutations';
import Button from '../../shared/Button';

const ProfileUpdateForm = () => {

    // redux
    const dispatch = useAppDispatch()
    const { ownerInfo } = useAppSelector(state => state.authReducer);


    const OwnerStateValues = {
        name: ownerInfo.name,
        phone: ownerInfo.phone,
        gender: ownerInfo.gender,
        currentAddress: ownerInfo.currentAddress,
        permanentAddress: ownerInfo.permanentAddress,
        dateOfBirth: ownerInfo.dateOfBirth
    }
    // state
    const [ownerData, setOwnerData] = useState(OwnerStateValues);


    // gql
    const [updateOwnerInfoMutation, { data, loading, error }] = useMutation(UPDATE_OWNER_INFO_MUTATION, {
        // refetchQueries: [GET_PRODUCTS_WITH_DETAILS],
    });

    console.log(data);



    // getting the value of the input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setOwnerData({ ...ownerData, [name]: value });
    };



    // getting the value of the select input field
    const handleSelectInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOwnerData({ ...ownerData, [name]: value });
    };



    // handle submit to update owner profile
    const handleUpdateOwnerProfile = (event: FormEvent) => {
        event.preventDefault();
        const { name, phone, gender, currentAddress, permanentAddress, dateOfBirth } = ownerData;

        // updating profile
        warningAlert('Yes, Update it!', () => (
            updateOwnerInfoMutation({
                variables: {
                    email: ownerInfo.email,
                    info: {
                        name, phone, gender, currentAddress, permanentAddress, dateOfBirth
                    }
                }
            }))
        );
    };




    useEffect(() => {
        // if profile not updated
        if (error) errorAlert(error.message)

        // if profile successfully updated
        if (data?.updateOwnerInfo) {
            const ownerInfo = {
                _id: data?.updateOwnerInfo.owner._id,
                name: data?.updateOwnerInfo.owner.name,
                email: data?.updateOwnerInfo.owner.email,
                password: data?.updateOwnerInfo.owner.password,
                phone: data?.updateOwnerInfo.owner.phone,
                image: data?.updateOwnerInfo.owner.image,
                role: data?.updateOwnerInfo.owner.role,
                gender: data?.updateOwnerInfo.owner.gender,
                currentAddress: data?.updateOwnerInfo.owner.currentAddress,
                permanentAddress: data?.updateOwnerInfo.owner.permanentAddress,
                dateOfBirth: data?.updateOwnerInfo.owner.dateOfBirth,
                accountStatus: data?.updateOwnerInfo.owner.accountStatus,
            }

            // success alert
            successAlert(data?.updateOwnerInfo?.message);

            // update data into localStorage
            localStorage.setItem("ownerInfo", JSON.stringify(ownerInfo))

            // update data into redux store
            dispatch({ type: 'setOwnerInfo', payload: ownerInfo })

        }

        // Reset the input fields
        setOwnerData(OwnerStateValues);
    }, [data, error, ownerInfo]);

    return (
        <form onSubmit={handleUpdateOwnerProfile}>
            <TextInputField
                name="name"
                labelName="Name"
                placeholder="Name"
                value={ownerData.name}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="phone"
                labelName="Phone"
                placeholder="Phone"
                value={ownerData.phone}
                onChange={handleInputChange}
                isRequired={true}
            />

            <SelectInputField
                options={[
                    { label: 'male', value: 'male' },
                    { label: 'female', value: 'female' },
                    { label: 'other', value: 'other' },
                    { label: 'N/A', value: 'N/A' },
                ]}
                onChange={handleSelectInputChange}
                name="gender"
                currentValue={ownerData.gender}
                labelName="Gender Status"
            />

            <TextInputField
                name="dateOfBirth"
                labelName="Date Of Birth"
                placeholder="Date Of Birth"
                value={ownerData.dateOfBirth}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="currentAddress"
                labelName="CurrentAddress"
                placeholder="CurrentAddress"
                value={ownerData.currentAddress}
                onChange={handleInputChange}
                isRequired={true}
            />

            <TextInputField
                name="permanentAddress"
                labelName="PermanentAddress"
                placeholder="PermanentAddress"
                value={ownerData.permanentAddress}
                onChange={handleInputChange}
                isRequired={true}
            />

            <Button color='red' buttonType='submit' buttonClass='w-full bg-primary'>Update</Button>
        </form>
    )
}

export default ProfileUpdateForm