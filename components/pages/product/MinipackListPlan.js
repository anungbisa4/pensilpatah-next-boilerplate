import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { CircleCheckIcon, CircleUncheckIcon } from "@/components/Icons";

import dynamic from "next/dynamic";

const SwiperMain = dynamic(() => import("@/components/Swiper/SwiperMain"));
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));

const MinipackListPlan = ({
  selectPlan,
  setSelectPlan,
  handlePlan,
  listPlan,
}) => {
  return (
    <SwiperMain
      initialSlide={0}
      hashNavigation
      slidesPerView="auto"
      id="main"
      className="w-full"
      preloadImages
      spaceBetween={8}
      className="swiper-pl-6 swiper-pr-6 pb-[8px!important]"
    >
      {listPlan?.map((plan, planIdx) => {
        return (
          <SwiperSlide
            key={planIdx}
            className={`w-[104px!important] h-[65px!important] bg-white shadow-sm rounded-[6px] active:opacity-50
                        ${
                          plan.product_name === selectPlan
                            ? "border-1 border-blue-primary"
                            : ""
                        }
                      `}
          >
            <div
              onClick={() => handlePlan(plan)}
              className="flex flex-col text-xs pt-4 pr-[10px] pb-[15px] pl-[13px] w-full outline-remove"
            >
              <div className="flex w-full justify-between pb-2 space-x-1">
                <h1 className="text-[11px] font-bold line-clamp-1">
                  {plan.product_name}
                </h1>
                {plan.product_name === selectPlan ? (
                  <CircleCheckIcon className="w-[10px] text-blue-primary" />
                ) : (
                  <CircleUncheckIcon className="w-[10px] text-gray-warm" />
                )}
              </div>
              <h2 className="text-[11px] font-bold leading-none line-clamp-1">
                <label className="text-[8px] font-medium">Rp</label>
                <PriceFormat value={plan.price} noPrefix />
                <label className="text-[8px] font-medium lowercase">
                  /{plan.unit_duration}
                </label>
              </h2>
            </div>
          </SwiperSlide>
        );
      })}
    </SwiperMain>
  );
};

export default MinipackListPlan;
