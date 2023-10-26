import CartLayout from '../components/cart/CartLayout';

const CartPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-backgroundColor">
      <div className="container mx-auto pt-8 px-5">
        <CartLayout />
      </div>
    </div>
  );
};

export default CartPage;
