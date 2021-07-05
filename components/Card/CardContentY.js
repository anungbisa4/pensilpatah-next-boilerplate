import { useState } from "react"
import dynamic from "next/dynamic"

const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));

const CardContentY = () => {
  return (
    <div className="card-content-y flex items-center">
      <div className="w-120pt">
        <MainBanner
          src={item.image}
          width={120}
          height={120}
          className="overflow-hidden rounded-xl"
        />
      </div>
      <div className="flex flex-col pl-4 self-stretch flex-grow justify-between">
        <h2 className="content-name text-sm font-semibold leading-none">
          Xstream Box 2nd Generation
        </h2>
        <span className="content-detail text-xs">
          Streaming Media Player{" "}
          <strong className="text-blue-primary">+ 3 Bulan</strong> Free Live TV
          & VOD
        </span>
        <span className="content-price text-xs">
          <strong>ONLY</strong>
          <strong className="text-blue-primary block">Rp499.000</strong>
        </span>
      </div>
    </div>
  );
}