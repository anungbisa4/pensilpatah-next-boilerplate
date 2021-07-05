import { useState } from "react";
import { DebetIcon } from "@/components/Icons";

import Card from "@/components/Card/Card";
import CardContentX from "@/components/Card/CardContentX";


export default function ProductCardService({item, rightDetail, leftDetail}) {
  const Detail = ({detailItem}) => {
    if (leftDetail) {
      return (
        <div className="flex items-center pt-4">
          <div className="px-3 py-1 border-1 rounded-md text-gray-warm text-10px">
            Hi Speed 30 mbps
          </div>
        </div>
      );
    }

    if (rightDetail) {
      return (
        <div className="flex justify-end items-center pt-4">
          <button className="outline-remove text-blue-primary active:opacity-70 mr-3">
            See Detail
          </button>
          <div
            className={`flex items-center p-1 px-4 rounded-full ${
              detailItem.status === "Auto Debet"
                ? "gradient-blue"
                : "bg-[#16bf6e]"
            }`}
          >
            <DebetIcon className="w-5 text-white pt-0.5 pr-0.5" />
            <span className="text-white text-10px">{detailItem.status}</span>
          </div>
        </div>
      );
    }

    return <></>
  }
  return (
    <>
      <Card className="bg-white shadow-md2 rounded-xl p-2 text-xs">
        <CardContentX
          customDetail
          imgSrc={item.image}
          imgAlt={"product image"}
          imgType="square"
          widthImage={112}
          heightImage={112}
          classImage="w-[112px]"
          containerClass="flex"
        >
          <div className="w-[calc(100%-112px)] flex flex-col justify-between self-stretch pl-3 py-1">
            <div>
              <h1 className="truncate font-semibold">{item.product_name}</h1>
              <p className="truncate text-10px text-gray-a1a1">
                Customer ID: <strong>{item.customer_id}</strong>
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <label className="text-[8px] text-gray-a1a1">
                  Billing cycle
                </label>
                <p className="text-10px truncate">{item.billing_cycle}</p>
              </div>
              <div>
                <label className="text-[8px] text-gray-a1a1">
                  Next Billing
                </label>
                <p className="text-10px truncate">{item.next_billing}</p>
              </div>
            </div>
            <div className="p-1 bg-blue-pale flex justify-between items-center">
              <label className="text-10px mr-0.5">Total: </label>
              <p className="truncate text-blue-primary font-semibold">
                {item.total}
              </p>
            </div>
          </div>
        </CardContentX>
        <Detail detailItem={item} />
      </Card>
    </>
  );
}
