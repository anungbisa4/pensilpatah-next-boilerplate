import { useState } from "react";
import Card from "@/components/Card/Card";
import { useSelector } from "react-redux";

export default function DeliveryDetailCard() {
  const { user } = useSelector((state) => state);
  const detail = user?.detail_transaction || "";
  return (
    <Card
      className="bg-white shadow-md2 rounded-xl text-xs"
      withHeader
      titleHeader="Delivery Detail"
    >
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <label className="">Courier</label>
          <span className="font-medium">{detail?.courier_package_text}</span>
        </div>
        <div className="flex justify-between">
          <label className="">Receipt Number</label>
          <span className="font-medium">{detail?.payment_code}</span>
        </div>
        <div className="flex justify-between">
          <label className="">Address</label>
          <span className="font-medium">{detail?.transaction_date_fmt}</span>
        </div>
      </div>
    </Card>
  );
}
