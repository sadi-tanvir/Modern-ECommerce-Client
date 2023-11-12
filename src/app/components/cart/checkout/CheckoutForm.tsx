'use client'
import { successAlert, warningAlert } from '@/app/components/alert-functions/alert';
import Button from '@/app/components/shared/Button'
import TextInputField from '@/app/components/shared/TextInputField'
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { clearCart } from "@/redux/reducers/cartReducer"


type CartType = {
    stockId: string;
    name: string;
    imageUrl: string;
    qty: number;
    price: number;
};

interface CheckoutFormProps {
    accessToken: string;
    ownerInfo: {
        _id: string;
        email: string;
        phone: string;
    };
    cart: CartType[];
    subTotalPrice: number;
    deliveryFee: number;
    discount: number;
    clearCart: any;
};

interface StateTypes {
    userId: string;
    email: string;
    phone: string;
    address: string;
    amount: number;
    items: CartType[];
};

class CheckoutForm extends Component<CheckoutFormProps, StateTypes> {
    constructor(props: CheckoutFormProps) {
        super(props)
        const { ownerInfo, subTotalPrice, deliveryFee, discount, cart } = props;
        const totalAmount = (subTotalPrice + deliveryFee) - discount;
        this.state = {
            userId: ownerInfo._id || '',
            email: ownerInfo.email || '',
            phone: ownerInfo.phone || '',
            address: "",
            amount: totalAmount,
            items: Object.values(cart) || []
        };
    };



    // handle input change
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };



    // handle place order
    handleCheckoutForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { userId, items, email, phone, address, amount } = this.state;
        const { accessToken } = this.props;
        // place order
        warningAlert('Yes, Create it!', () => (
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: accessToken
                },
                body: JSON.stringify({
                    query: `mutation createOrder($info: OrderInputs!) {
                                  createOrder(data: $info) {
                                      status
                                      message
                                  }
                              }`,
                    variables: {
                        info: {
                            userId,
                            items,
                            email,
                            phone,
                            address,
                            amount,
                        },
                    },
                })
            })
                .then(res => res.json())
                .then(data => {
                    // clear cart data
                    this.props.clearCart()

                    // success alert
                    successAlert(data.data.createOrder.message)

                    // redirect to the order page
                    window.location.replace(`${process.env.NEXT_PUBLIC_HOSTING_URL}/orders-history`);
                })
        ));
    };

    componentDidUpdate(prevProps: Readonly<CheckoutFormProps>, prevState: Readonly<StateTypes>, snapshot?: any): void {
        const { ownerInfo, cart, subTotalPrice, deliveryFee, discount } = this.props;
        if (prevProps != this.props) {
            // updating the state
            this.setState({
                userId: ownerInfo._id,
                email: ownerInfo.email,
                phone: ownerInfo.phone,
                items: Object.values(cart),
                amount: (subTotalPrice + deliveryFee) - discount
            });
        };
    };

    render() {
        const { email, phone, address } = this.state;

        return (
            <>
                <form onSubmit={this.handleCheckoutForm.bind(this)}>
                    <TextInputField
                        name="email"
                        labelName="Email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleInputChange}
                        isRequired={true}
                    />

                    <TextInputField
                        name="phone"
                        labelName="Phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={this.handleInputChange}
                        isRequired={true}
                    />

                    <TextInputField
                        name="address"
                        labelName="type your address"
                        placeholder="type your address"
                        value={address}
                        onChange={this.handleInputChange}
                        isRequired={true}
                    />
                    <Button buttonType='submit' buttonClass='w-full bg-primary' boxShadowColor='#35af00'>Place Order</Button>
                </form>
            </>
        );
    };
};

const mapStateToProps = (state: any) => {
    const { ownerInfo, accessToken } = state.authReducer;
    const { cart } = state.cartReducer;
    return {
        accessToken,
        ownerInfo,
        cart
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            clearCart
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
