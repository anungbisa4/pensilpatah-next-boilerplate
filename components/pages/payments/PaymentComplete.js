import { useState } from "react";
import dynamic from "next/dynamic";

const CardContentX = dynamic(() => import("@/components/Card/CardContentX"));
const Count = dynamic(() => import("@/components/Action/Count"));

const PaymentContent = ({ ...props }) => {
  return (
    <>
      <div className="payment-complete relative w-full bg-gray-100 min-h-screen rounded-t-2xl mt-4 p-4 pb-8pt sm:p-24pt">
        <CardContentX
          imgSrc={"/dummy-img/square-1.png"}
          imgAlt="test"
          imgType="square"
          justifyBetween
        />
        <div className="mt-4 flex justify-end">
          <Count />
        </div>
        <section className="detail-package">
          <h2 className="text-md font-semibold">Details: </h2>
          <div className="">
            <div className="">
              <h2 className="text-md">Kelengkapan Produk</h2>
            </div>
            <div className="">
              <h2>Spesifikasi</h2>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PaymentContent;
