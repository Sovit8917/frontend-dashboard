"use client";
import React, { useEffect } from "react";
import { cardData } from "@/data/courseData";
import axios from "axios";

function Page() {

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onPayment = async (price, itemName) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RAZORPAY_BACKEND}/api/createOrder`,
        {
          courseId: 1,
          amount: price,
        }
      );

      const order = res.data.data; 

      const paymentObject = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Sovit Courses",
        description: itemName,
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${process.env.NEXT_PUBLIC_RAZORPAY_BACKEND}/api/verifyPayment`,
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              alert("✅ Payment Successful");
            } else {
              alert("❌ Payment Failed");
            }
          } catch (error) {
            console.log(error);
          }
        },

        theme: {
          color: "#2563eb",
        },
      });

      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-gray-600 font-bold mb-8 text-center">
          Explore Courses
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cardData.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg text-gray-700 font-semibold mb-2">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-lg">
                    ₹{item.price}
                  </span>

                  <button
                    onClick={() => onPayment(item.price, item.title)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;