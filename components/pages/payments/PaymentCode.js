import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { clearPaymentCode } from "@/store/order/action";
import { toast, ToastContainer } from "react-toastify";

import dynamic from "next/dynamic";

const InfoCircleIcon = dynamic(() =>
  import("@/components/Icons/InfoCircleIcon")
);
const CopyIcon = dynamic(() => import("@/components/Icons/CopyIcon"));
const Toast = dynamic(() =>
  import("@/components/Toast").then((mod) => mod.Toast)
);

const PaymentCode = () => {
  const { order } = useSelector((state) => state);
  const router = useRouter();

  const onCLose = () => router.push("/");
  const handleCopy = () => {
    toast.success(<Toast value="Coppied" status="success" />, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1500,
      toastId: "success-toast",
      delay: 100,
    });
  };
  return (
    <>
      <div className="payment-code mt-4 text-center text-base font-semibold">
        <label>Payment Code</label>
        <h1 className="mt-8 text-3xl xs:text-4xl tracking-widest py-3 border-solid border-b-2 border-black font-medium">
          {order?.payment_code}
        </h1>
        <CopyToClipboard onCopy={handleCopy} text={order?.payment_code}>
          <button className="outline-remove flex justify-center items-center w-full active:opacity-70 p-2">
            <CopyIcon className="w-4 text-blue-primary" />
            <label className="text-blue-primary text-xs p-2">Copy Code</label>
          </button>
        </CopyToClipboard>
      </div>
      <div className="p-4 mt-8 bg-white shadow-sm rounded-xl">
        <div className="flex items-center">
          <InfoCircleIcon className="w-6 text-blue-primary" />
          <label className="ml-2 font-bold">Information</label>
        </div>
        <ol className="text-xs list-disc list-inside ml-2 mt-2">
          <li>Your Pay Code will be sent via email</li>
          <li>
            <a
              href="/payment/how-to-pay"
              className="text-blue-primary underline"
            >
              How to pay
            </a>
          </li>
        </ol>
      </div>
      <div className="w-36 mx-auto py-8">
        <button
          type="button"
          className="button-blue-gradient text-sm"
          onClick={onCLose}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default PaymentCode;
