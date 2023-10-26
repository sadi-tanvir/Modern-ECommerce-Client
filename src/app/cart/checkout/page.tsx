import CheckoutLayout from '@/app/components/cart/checkout/CheckoutLayout';

const Checkout = () => {
    return (
        <div className="w-full flex justify-center items-start pt-20 md:min-h-screen bg-backgroundColor">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Checkout</h2>
                <CheckoutLayout />
            </div>
        </div>
    )
}

export default Checkout;