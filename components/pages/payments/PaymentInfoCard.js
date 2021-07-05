import { useState } from "react";
import MainBanner from "@/components/Banner/MainBanner";

const PaymentInfoCard = ({ info }) => {
  return (
    <>
      <div className="my-4 p-4 bg-white rounded-2xl">
        <div className="flex justify-between items-center w-full border-b-1 pb-3">
          <label className="text-sm font-semibold">{info?.title}</label>
          {info?.logo && info?.type && (
            <div
              className={info.type === "bank_mega" ? "w-[46.1px]" : "w-[90px]"}
            >
              <MainBanner
                src={info.logo}
                width={info.type === "bank_mega" ? 46.1 : 170}
                height={info.type === "bank_mega" ? 28 : 20}
                alt="image logo"
                layout="responsive"
                bgTransparent
              />
            </div>
          )}
        </div>
        <div className="p-4">
          <ol className="list-text text-xs list-disc">
            {info?.details?.map((info, infoIdx) => {
              return <li key={infoIdx}>{info}</li>;
            })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default PaymentInfoCard;
