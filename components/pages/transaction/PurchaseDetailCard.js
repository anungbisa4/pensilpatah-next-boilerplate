import { useState } from "react"
import Card from "@/components/Card/Card";
import dynamic from "next/dynamic"
import CardContentX from "@/components/Card/CardContentX";
import { useSelector } from "react-redux";

const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));

export default function PurchaseDetailCard () {
  const { user } = useSelector((state) => state);
  const detail = user?.detail_transaction || "";
  return (
    <Card
      className="bg-white shadow-md2 rounded-xl text-xs"
      withHeader
      titleHeader="Purchase Detail"
    >
      <div className="p-4">
        <CardContentX
          customDetail
          imgSrc={detail.thumbnail_img || "/img/no-image.webp"}
          imgAlt={detail.product_name || "product image"}
          imgType="square"
          widthImage={104}
          heightImage={104}
          classImage="w-104px"
          containerClass="flex" 
        >
          <div className="flex flex-shrink-100 flex-col p-1 pl-4 justify-between self-stretch">
            <h2 className="content-name text-sm font-semibold leading-none line-clamp-2">
              {detail?.product_name}
            </h2>
            <span className="content-detail text-xs line-clamp-2">
              {detail?.second_title}
            </span>
            <span className="content-price text-xs flex justify-between space-x-2">
              <span className="truncate">
                {detail?.product_qty}x Package
              </span>
              <strong className="text-blue-primary block truncate">
                {<PriceFormat value={detail?.product_amount} />}
              </strong>
            </span>
          </div>
        </CardContentX>
      </div>
    </Card>
  );
}