import { useState } from "react"

import dynamic from "next/dynamic"
import Card from "@/components/Card/Card";
import Label from "@/components/Label/Label";

const PromoIcon = dynamic(() => import("@/components/Icons").then(mod => mod.PromoIcon))
const DeliveryIcon = dynamic(() =>
  import("@/components/Icons").then((mod) => mod.DeliveryIcon)
);
const InfoCircleOutlineIcon = dynamic(() =>
  import("@/components/Icons").then((mod) => mod.InfoCircleOutlineIcon)
);

export default function NotificationCard ({item, ...props}) {
  return (
    <>
      <Card>
        <div className="cursor-pointer active:opacity-70">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {item.type === "track" && (
                <DeliveryIcon className="w-4 text-gray-powder" />
              )}
              {item.type === "info" && (
                <InfoCircleOutlineIcon className="w-4 text-gray-powder" />
              )}
              {item.type === "promo" && (
                <PromoIcon className="w-4 text-gray-powder" />
              )}
              <label className="ml-1 text-gray-powder font-medium text-xs">{ item.label }</label>
            </div>
            <div>
              <Label title={item.time} className="rounded-full p-2 py-1 text-10px bg-blue-primary font-semibold"/>
            </div>
          </div>
          <h1 className="text-14px font-bold">{ item.title }</h1>
          <p className="text-xs text-gray-expired">{ item.description }</p>
        </div>
      </Card>
    </>
  );
}