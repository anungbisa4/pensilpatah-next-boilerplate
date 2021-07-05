import { useState, useEffect } from "react";
import Card from "@/components/Card/Card";
import { useSelector } from "react-redux";


export default function DetailTrackingCard() {
  const { user } = useSelector((state) => state);
  const tracking = user?.detail_transaction;

  return (
    <Card className="card-rounded-xl space-y-4">
      <div className="flex">
        <div className="w-1/2">
          <label className="text-10px font-medium text-gray-light-dark">
            Delivery date:
          </label>
          <p>{tracking.transaction_date_fmt}</p>
        </div>
        <div className="w-1/2">
          <label className="text-10px font-medium text-gray-light-dark">
            Receiver:
          </label>
          <p>{tracking.receiver_name}</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <label className="text-10px font-medium text-gray-light-dark">
            Shipping service:
          </label>
          <p>{tracking.courier_package_text}</p>
        </div>
        <div className="w-1/2">
          <label className="text-10px font-medium text-gray-light-dark">
            Address:
          </label>
          <p>{tracking.receiver_address}</p>
        </div>
      </div>
    </Card>
  );
}
