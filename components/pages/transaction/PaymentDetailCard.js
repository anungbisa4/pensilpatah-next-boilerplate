import { useState } from "react";
import Card from "@/components/Card/Card";
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux";
import PriceFormat from "@/components/Filter/PriceFormat";

export default function PaymentDetailCard() {
  const { user } = useSelector((state) => state);
  const detail = user?.detail_transaction || "";
  const dispatch = useDispatch()
  const router = useRouter()

  const onInvoice = () => {
    // console.log(user)
    router.push(`/invoice/[payment_code]`, `/invoice/${detail?.payment_code}`);
  }
  return (
    <Card
      className="bg-white shadow-md2 rounded-xl text-xs"
      withHeader
      titleHeader="Payment Detail"
      rightHeaderAction={
        <a
          onClick={onInvoice}
          className="text-xs text-blue-primary active:opacity-70"
        >
          See Invoice
        </a>
      }
    >
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <label className="">Payment Method</label>
          <span className="font-medium">{detail?.payment_name}</span>
        </div>
        <div className="flex justify-between">
          <label className="">Price</label>
          <span className="font-medium">
            <PriceFormat value={detail?.product_amount} />
          </span>
        </div>
        <div className="flex justify-between">
          <label className="">Delivery Fee</label>
          <span className="font-medium">
            <PriceFormat value={detail?.courier_fee} />
          </span>
        </div>
        <div className="flex justify-between pt-2 text-blue-primary text-sm font-semibold">
          <label className="">Total Payment</label>
          <span className="">
            <PriceFormat value={detail?.total_invoice} />
          </span>
        </div>
      </div>
    </Card>
  );
}
