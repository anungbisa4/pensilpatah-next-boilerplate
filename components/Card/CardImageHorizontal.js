import { useState } from "react";
import dynamic from "next/dynamic";

const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));

export default function CardImageHorizontal({ src, title, link, alt, widthImg, heightImg }) {
  return (
    <div className="card-image-horizontal rounded-xl bg-white shadow-md overflow-hidden">
      <MainBanner
        src={src || "/no-image.webp"}
        width={widthImg || 313}
        height={heightImg || 152}
        className="overflow-hidden"
      />
      <div className="p-5">
        <h2 className="line-clamp-3 md:line-clamp-none text-sm font-bold">
          {title}
        </h2>
      </div>
    </div>
  );
}
