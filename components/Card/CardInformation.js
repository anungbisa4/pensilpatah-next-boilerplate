import { useState } from "react";
import InfoCircleIcon from "@/components/Icons/InfoCircleIcon";

export default function CardInformation({
  children,
  iconClass,
  containerClass,
}) {
  return (
    <div className={`p-4 mt-8 bg-white shadow-sm rounded-xl ${containerClass}`}>
      <div className="flex items-center">
        <InfoCircleIcon className={`w-4 text-blue-primary ${iconClass}`} />
        <label className="ml-2 font-bold text-[14px]">Information</label>
      </div>
      <div>{children}</div>
    </div>
  );
}
