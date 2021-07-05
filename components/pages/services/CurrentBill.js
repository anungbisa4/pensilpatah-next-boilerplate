import { useState } from "react";
import { BillPaymentHistory } from "./index";
import { ChevronRightIcon } from "@heroicons/react/solid";

import MainBanner from "@/components/Banner/MainBanner";
import Card from "@/components/Card/Card";
import Link from "next/link";

const CurrentBill = ({ ...props }) => {
  const [expanded, setExpanded] = useState(0);
  return (
    <>
      <section>
        <div className="px-6">
          <div className="w-[200px] mx-auto py-8">
            <MainBanner
              src="/dummy-img/hi-speed-bill.png"
              width={200}
              height={69}
              bgTransparent
              unoptimized
            />
          </div>
          <div className="flex justify-between text-base font-semibold">
            <h1>Your Bill</h1>
            <div>127611000123</div>
          </div>
          <Card className="card-rounded-xl p-6 mt-4">
            <div className="flex justify-between items-stretch space-x-4">
              <div className="">
                <h2 className="text-base font-semibold">HiSpeed 100GB</h2>
                <span className="text-gray-a1a1 text-10px">
                  January 10, 2021
                </span>
              </div>
              <h2 className="self-center text-base font-semibold text-blue-primary border-dashed border-1 border-blue-primary px-3 h-[32px]  flex items-center justify-center">
                Rp.568.000
              </h2>
            </div>
          </Card>
        </div>
        <div className={`section-banner px-6 flex justify-between pt-6 pb-3`}>
          <h1 className="text-base leading-none font-semibold">
            Payment History
          </h1>
          <div className="flex items-center text-sm leading-none font-medium">
            <Link href="#">
              <a className="flex items-center text-blue-primary hover:text-blue-dark-sky">
                <label className="w-104px text-right">See All</label>
                <ChevronRightIcon className="w-4 text-blue-primary" />
              </a>
            </Link>
          </div>
        </div>
        <div className="divide-y-1">
          {arr.map((item, index) => {
            return (
              <BillPaymentHistory
                id={index}
                key={index}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CurrentBill;
const arr = [1, 2, 3, 4, 5, 6, 67, 8, 8];
