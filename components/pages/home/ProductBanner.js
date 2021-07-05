import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import useSWR from "swr";
import Fade from "react-reveal/Fade";

import { getProducts } from "@/utils/apiHandlers";
import { slug, handleLinkProduct } from "@/utils/filter";
import { SwiperSlide } from "swiper/react";

// no-splitting
import CardProductLoader from "@/components/Loader/CardProductLoader";
import CardHorizontalLoader from "@/components/Loader/CardHorizontalLoader";

const CardImage = dynamic(() => import("@/components/Card/CardImage"), {
  loading: () => <CardHorizontalLoader className="w-full" />,
});
const SwiperMain = dynamic(() => import("@/components/Swiper/SwiperMain"));

const ProductBanner = () => {
  const { data, error } = useSWR("/api/products", getProducts);

  if (!data || data?.data?.result?.length <= 0 || error)
    return <CardProductLoader className="w-full" />;

  return (
    <>
      <Fade>
        <div>
          <SwiperMain
            // cssMode
            className="swiper-pb-4 swiper-pl-6 swiper-pr-6"
            spaceBetween={9}
            slidesPerView="auto"
            mousewheel
            direction="horizontal"
            preloadImages
          >
            {data?.data?.result?.map((item, index) => {
              const title = slug(item.ProductName) || "trans";
              return (
                <SwiperSlide
                  className="horizontal-banner swiper-item-container h-auto swiper-wx-103 active:opacity-70"
                  key={index}
                >
                  <div className="flex flex-col justify-center cursor-pointer">
                    <Link
                      href={handleLinkProduct(item.ProductId, title)}
                      key={item.ProductId + index}
                    >
                      <CardImage
                        src={item.ThumbnailImg}
                        alt={title}
                        width={150}
                        height={60}
                        layout="intrinsic"
                        className="product-banner-card shadow-lg bg-white flex items-center justify-center test py-14px rounded-lg active:opacity-70"
                      />
                    </Link>
                    <h2 className="text-xs text-center pt-3 font-medium">
                      {item.ProductName}
                    </h2>
                  </div>
                </SwiperSlide>
              );
            })}
          </SwiperMain>
        </div>
      </Fade>
    </>
  );
};

export default ProductBanner;
