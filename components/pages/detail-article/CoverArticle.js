import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router"

const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));

const CoverArticle = ({ src }) => {
  const router = useRouter()

  return (
    <>
      <MainBanner
        alt="cover-article"
        src={
          // router.query.image_src ||
          "/dummy-img/imageCover@3x.jpg" ||
          "/img/no-image.webp"
        }
        width={375}
        height={312}
      />
    </>
  );
};

export default CoverArticle;
