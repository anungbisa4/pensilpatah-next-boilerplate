import { useState } from "react";
import Card from "@/components/Card/Card";
import { useSelector } from "react-redux"

export default function StatusDetailTransaction() {
  const { user } = useSelector(state => state)
  const detail = user?.detail_transaction || ""
  return (
    <section className="px-4 text-xs p-4 space-y-2">
      <div className="flex justify-between">
        <label className="">Status</label>
        <span className={`font-medium text-blue-primary`}>
          {detail?.transaction_status}
        </span>
      </div>
      <div className="flex justify-between">
        <label className="">Payment Method</label>
        <span>{detail?.payment_name}</span>
      </div>
      <div className="flex justify-between">
        <label className="">Payment Code</label>
        <span className="">{detail?.payment_code}</span>
      </div>
      <div className="flex justify-between">
        <label className="">Date</label>
        <span className="">{detail?.transaction_date_fmt}</span>
      </div>
      <div className="flex justify-between">
        <label className="">Category</label>
        <span className="">{detail?.product_name}</span>
      </div>
    </section>
  );
}
