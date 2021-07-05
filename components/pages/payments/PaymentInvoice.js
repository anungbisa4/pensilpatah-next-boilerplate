import { useState } from "react"
import { useSelector } from "react-redux"
import dynamic from "next/dynamic"
import logoGray from "@/public/icons/logo-gray.svg";

const Label = dynamic(() => import("@/components/Label/Label"))
const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));

const Invoice = ({props}) => {
  const { user } = useSelector((state) => state);
  const invoice = user?.invoice || "";
  const imageUrl = user?.detail_transaction?.thumbnail_img || "/dummy-img/square-1.png";
  const cekStatus =
    invoice?.PaymentStatus == "UNPAID"
      ? "error"
      : invoice?.PaymentStatus == "PAID"
      ? "success"
      : "expired";

      console.log(user)
  return (
    <>
      <div className="card-invoice p-4 px-3 pr-8 bg-white rounded-md shadow-md relative">
        <div className="flex justify-between">
          <div className="w-3/4">
            <div className="flex flex-wrap items-center">
              <label className="mr-2 font-semibold text-10px text-gray-bluey">
                INVOICE FOR
              </label>
              <Label
                className="p-2 py-1 text-xs font-semibold rounded-full"
                type={cekStatus}
                title={invoice?.PaymentStatus}
              />
            </div>
            <div className="mt-2">
              <h2 className="text-sm font-bold truncate ">
                {invoice?.ReceiverName}
              </h2>
              <p className="text-xs pr-2 pt-1 text-gray-bluey">
                {invoice?.ReceiverAddress}
              </p>
            </div>
          </div>
          <div className="w-1/4">
            <MainBanner
              src={imageUrl}
              width={100}
              height={100}
              className="overflow-hidden rounded-xl"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6 mb-2">
          <label className="font-semibold text-10px text-gray-bluey">
            ITEM
          </label>
          <label className="font-semibold text-10px text-gray-bluey">
            TOTAL
          </label>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 font-bold text-sm flex flex-col">
            <span>{invoice?.ProductName}</span>
            <span className="font-normal text-xs">Qty x {invoice?.Qty}</span>
          </div>
          <div className="w-1/2 font-bold text-sm text-right">
            {<PriceFormat value={invoice?.ProductTotal} />}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="w-1/2 font-bold text-base flex flex-col">
            <span>Shipping cost</span>
          </div>
          <div className="w-1/2 font-bold text-sm text-right">
            {<PriceFormat value={invoice?.ShippingCost} />}
          </div>
        </div>
        <div className="w-full border-b-2 border-solid border-gray-200 pt-6" />
        <div className="flex flex-col mt-6">
          <div className="self-end">
            <label className="text-xs text-gray-bluey">TOTAL AMOUNT</label>
          </div>
          <div className="self-end mt-2 font-bold text-xl">
            {<PriceFormat value={invoice?.InvoiceAmount} />}
          </div>
        </div>
        <div className="absolute top-0 h-full w-3 py-4 right-3 opacity-50">
          <div
            style={{
              backgroundImage: `url(${logoGray})`,
              // backgroundAttachment: "fixed",
              backgroundRepeat: "space",
            }}
            className="h-full w-full"
          />
        </div>
      </div>
    </>
  );
}

export default Invoice