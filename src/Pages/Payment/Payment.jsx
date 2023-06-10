import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import UseCart from "../../Hooks/UseCart";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const [cart] = UseCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))
    return (
          <div className='w-4/6 mx-auto'>
            <h1 className="text-center">Proceed to pay: Total {price}$</h1>
            <Elements stripe={stripePromise}>
                <Checkout cart={cart} price={price}></Checkout>
            </Elements>
        </div>
    );
};

export default Payment;