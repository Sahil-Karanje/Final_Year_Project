import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
// import { clearErrors, newOrder } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import MetaData from '../Layouts/MetaData';

const Payment = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [payDisable, setPayDisable] = useState(false);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    // const { error } = useSelector((state) => state.newOrder);
    const stripe = useStripe();
    const elements = useElements();
    // const paymentBtn = useRef(null);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        navigate("/order/success");
        try {
            // const config = {
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // };

            // const { data } = await axios.post(
            //     '/api/v1/payment/process',
            //     paymentData,
            //     config,
            // );
        } catch (error) {

        }

    };

    // useEffect(() => {
    //     if (error) {
    //         dispatch(clearErrors());
    //         enqueueSnackbar(error, { variant: "error" });
    //     }
    // }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Flipkart: Secure Payment | Stripe" />
            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">
                                <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
                                    
                                    <input onSubmit={submitHandler} type="submit" value="Pay" className="bg-primary-orange w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none cursor-pointer" />
                                    
                                </form>
                            </div>
                        </Stepper>
                    </div>
                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;
