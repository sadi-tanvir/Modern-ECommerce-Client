import React, { Component } from 'react'

interface SummaryPropsTypes {
    deliveryFee: number;
    discount: number;
    subTotalAmount: number;
};

export default class Summary extends Component<SummaryPropsTypes> {
    constructor(props: SummaryPropsTypes) {
        super(props)
    };

    render() {
        const { subTotalAmount, deliveryFee, discount } = this.props;
        return (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold mb-2 text-secondary">Order Summary</h3>
                {/* Display the items in the order with their prices */}
                <div className="flex justify-between mb-2 text-secondary">
                    <span>Subtotal:</span>
                    <span>৳{subTotalAmount}</span>
                </div>
                <div className="flex justify-between mb-2 text-secondary">
                    <span>Delivery Fee:</span>
                    <span>৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between mb-2 text-secondary">
                    <span>Discount:</span>
                    <span className='text-danger'>-৳{discount}</span>
                </div>
                <hr className="border-t my-2" />
                <div className="flex justify-between text-secondary font-bold">
                    <span>Total:</span>
                    <span className='text-success'>৳{(subTotalAmount + deliveryFee) - discount}</span>
                </div>
            </div>
        );
    };
};
