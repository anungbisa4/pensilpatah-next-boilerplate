import dynamic from 'next/dynamic'
// loader
import ScreenLoader from "@/components/Loader/ScreenLoader";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux"

const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));
const Header = dynamic(() => import("@/components/pages/product/Header"), {
  loading: () => <ScreenLoader />,
});

const handleNav = (id) => {
  switch(id) {
    case "42":
      return false
    case "44":
      return true
    case "46":
      return true
    case "121":
      return true
    default:
      return true
  }
}
const ProductCover = ({ bannerSrc, headerTitle }) => {
  const router = useRouter();
  const { product } = useSelector((state) => state);

  return (
    <>
      <div className="fixed h-screen w-screen overflow-hidden -z-1">
        <MainBanner
          src={product?.detail_package?.HeaderImg || bannerSrc || "/error.jpg"}
          height={752}
          width={351}
        />
      </div>
      <div className="product-cover-wrapper absolute inset-x-0 top-0 z-50">
        <Header
          title={headerTitle || "Products"}
          isColor={handleNav(product?.detail_package?.ProductId)}
          backNav
        />
      </div>
    </>
  );
};

export default ProductCover