import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import {
  CircleCheckIcon,
  CircleUncheckIcon,
  StarTicketIcon,
} from "@/components/Icons";

import dynamic from "next/dynamic";

const SwiperMain = dynamic(() => import("@/components/Swiper/SwiperMain"));
const MinipackDetailModal = dynamic(() =>
  import("./index").then((mod) => mod.MinipackDetailModal)
);

const MinipackListPackage = ({
  selectPackage,
  setSelectPackage,
  handlePackage,
  listPackage,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [detailPackage, setDetailPackage] = useState({});
  const router = useRouter();
  const handleDetail = (item) => {
    setOpenModal(!openModal);
    setDetailPackage(item);
  };
  return (
    <>
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
        {listPackage?.map((packageItem, packageIdx) => {
          return (
            <SwiperSlide
              key={packageIdx}
              className={`w-[128px!important] h-[148px!important] bg-white shadow-sm rounded-[6px] relative active:opacity-50
                          ${
                            packageItem.minipack === selectPackage
                              ? "border-1 border-blue-primary"
                              : ""
                          }
                        `}
            >
              <div
                type="button"
                onClick={() => handlePackage(packageItem)}
                className={`flex items-stretch justify-center h-full relative outline-remove box-border active:opacity-50`}
              >
                <div className="relative self-stretch flex-col justify-between items-center p-[14px] pt-[21px] text-xs space-y-3">
                  <div className="flex justify-center">
                    {packageItem.img_url ? (
                      "image"
                    ) : (
                      <StarTicketIcon className="w-6" />
                    )}
                  </div>
                  <h1 className="text-center font-bold line-clamp-1 leading-none">
                    {packageItem.minipack}{" "}
                  </h1>
                  <p className="text-center text-[9px] line-clamp-2 leading-0 font-medium">
                    {packageItem.description === "-"
                      ? "Best Selection movie channels"
                      : packageItem.description}
                  </p>
                  <button
                    onClick={() => handleDetail(packageItem)}
                    className="outline-remove font-semibold text-blue-primary mt-[8px!important] text-center w-full text-[9px] leading-none"
                    type="button"
                  >
                    More Details
                  </button>
                </div>
                <div className="absolute right-3 top-3">
                  {packageItem.minipack === selectPackage ? (
                    <CircleCheckIcon className="w-[10px] text-blue-primary" />
                  ) : (
                    <CircleUncheckIcon className="w-[10px] text-gray-warm" />
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </SwiperMain>
      {/* modal start */}
      <MinipackDetailModal
        detailPackage={detailPackage}
        open={openModal}
        toggle={() => handleDetail()}
      />
      {/* modal end */}
    </>
  );
};

export default MinipackListPackage;
