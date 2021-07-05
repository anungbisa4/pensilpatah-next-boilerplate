import { useState } from "react"
import dynamic from "next/dynamic";

const AccordionBasic = dynamic(() =>
  import("@/components/Accordion/AccordionBasic")
);
const CardContentX = dynamic(() => import("@/components/Card/CardContentX"));

export default function BillPaymentHistory({id, expanded, setExpanded, ...props}) {

  const Header = () => {
    return (
      <CardContentX
        justifyCenter
        imgSrc="/dummy-img/promo1@3x.jpg"
        imgAlt="img trans"
        imgType="square"
        widthImage={60}
        heightImage={60}
        classImage="w-11"
        classImageDetail="rounded"
      >
        <div>
          <h2 className="font-semibold text-sm">Hi-Speed 100GB</h2>
          <h2 className="font-medium text-gray-a1a1 text-xs">25 Mar 2021</h2>
        </div>
      </CardContentX>
    );
  }

  return (
    <>
      <div>
        <AccordionBasic
          i={id}
          title={<Header />}
          expanded={expanded}
          setExpanded={setExpanded}
          className="bg-white px-6 py-4"
          classIcon="text-gray-a1a1 w-[25px!important]"
          typeIcon="chevron"
        >
          <main className="pt-4 divide-y-1">
            <div className="flex justify-between py-2">
              <h1 className="text-xs font-semibold">Subscriber Number</h1>
              <div className="text-xs text-gray-a1a1 font-medium text-right w-1/2">
                127611000123
              </div>
            </div>
            <div className="flex justify-between py-2">
              <h1 className="text-xs font-semibold">Billing Number</h1>
              <div className="text-xs text-gray-a1a1 font-medium text-right w-1/2">
                007135515032021
              </div>
            </div>
            <div className="flex justify-between py-2">
              <h1 className="text-xs font-semibold">Period</h1>
              <div className="text-xs text-gray-a1a1 font-medium text-right w-1/2">
                26 Apr 2021 - 25 Mar 2021
              </div>
            </div>
            <div className="flex justify-between py-2">
              <h1 className="text-xs font-semibold">Amount</h1>
              <div className="text-xs text-gray-a1a1 font-medium text-right w-1/2">
                Rp568.000
              </div>
            </div>
            <div className="flex justify-between py-2">
              <h1 className="text-xs font-semibold">Status</h1>
              <div className="text-xs text-gray-a1a1 font-medium text-right w-1/2">
                Paid
              </div>
            </div>
            <div className="flex justify-between py-2">
              <h1 className="text-xs font-semibold">Site Address</h1>
              <div className="text-xs text-gray-a1a1 font-medium text-right w-1/2">
                Apartment, Puri Kemayoran Tower Jl. Landas Pacu Selatan Kebon
                Kosong Kemayoran Jakarta Pusat 10630
              </div>
            </div>
          </main>
        </AccordionBasic>
      </div>
    </>
  );
}