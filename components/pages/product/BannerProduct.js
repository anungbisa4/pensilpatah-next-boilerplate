import { useState } from 'react'
import dynamic from "next/dynamic"
// loader
import ScreenLoader from "@/components/Loader/ScreenLoader";

const CoverFlowBanner = dynamic(
  () => import("@/components/Banner/CoverFlowBanner"),
  {
    loading: () => <ScreenLoader />,
  }
);

function BannerProduct({ banner }) {
  return (
    <>
      <div className="banner-product ">
        <CoverFlowBanner items={banner} />
      </div>
    </>
  );
}

export default BannerProduct