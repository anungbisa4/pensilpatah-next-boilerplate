import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/outline";
import { getPackageRecommendation } from "@/store/product/action";
import { useDispatch, useSelector } from "react-redux";

// style
import "@/styles/main.module.scss";

// loader
import CardProductLoader from "@/components/Loader/CardProductLoader";
import HomeBannerLoader from "@/components/Loader/HomeBannerLoader";
import CardHorizontalLoader from "@/components/Loader/CardHorizontalLoader";

const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"), {
  loading: () => <HomeBannerLoader className="relative w-full" />,
});
const SectionBanner = dynamic(() =>
  import("@/components/Banner/SectionBanner")
);
const CardMainMenu = dynamic(() =>
  import("@/components/pages/home/CardMainMenu")
);
const ProductBanner = dynamic(
  () => import("@/components/pages/home/ProductBanner"),
  {
    loading: () => <CardProductLoader className="w-full" />,
  }
);
const CardBill = dynamic(() => import("@/components/pages/home/CardBill"), {
  loading: () => <CardHorizontalLoader className="w-full" />,
});

const bannerMovie = require("@/dummy/movie-vertical");
const bannerArticle = require("@/dummy/article-hor.json");

const Main = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getPackageRecommendation());
  }, []);

  console.log("main");

  return (
    <div className="main-home pt-[40pt] pb-[58pt]">
      <section className="relative">
        <MainBanner
          className="relative overflow-hidden rounded-b-2xl"
          src="/dummy-img/banner2@3x.jpg"
        />
        <CardMainMenu className=" px-6 z-10 absolute -bottom-10 w-full h-20 left-1/2 transform -translate-x-2/4" />
      </section>
      <section className="mt-52px">
        <ProductBanner />
      </section>
      <section className="px-6 mt-2 relative">
        <div className="relative overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={"/dummy-img/alloBanner.png"}
            alt="image banner"
            width={1125}
            height={270}
            layout="responsive"
          />
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 outline-none">
            <Link href="#">
              <a className="w-12 h-12 bg-gray-50 flex justify-center items-center overflow-hidden rounded-full outline-none">
                <ChevronRightIcon className="w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12" />
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className="px-6 mt-8">
        <CardBill />
      </section>
      <section className="mt-8 relative">
        <SectionBanner
          title="Movie you can watch"
          verticalBanner
          banner={bannerMovie}
        />
      </section>
      <section className="mt-8 relative">
        <SectionBanner
          title="Product recommendation"
          horizontalBanner
          banner={product?.data_recommendation?.result}
        />
      </section>
      <section className="mt-8 relative">
        <SectionBanner
          title="Promo of the day"
          squareBanner
          banner={product?.data_recommendation?.result}
        />
      </section>
      <section className="mt-8 relative">
        <SectionBanner title="News for you" cardBanner banner={bannerArticle} />
      </section>
    </div>
  );
};

export default Main;
