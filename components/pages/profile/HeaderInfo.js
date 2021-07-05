import { useState } from "react"
import dynamic from "next/dynamic"

import { useSelector } from "react-redux"

const Avatar = dynamic(() => import("@/components/Avatar/Avatar"));
const CouponIcon = dynamic(() => import("@/components/Icons/CouponIcon"));


const HeaderInfo = ({...props}) => {
  const { userProfile, customerInfo } = useSelector((state) => state.user);
  return (
    <>
      <div className="header-info w-full flex flex-col justify-center items-center">
        <Avatar src="/icons/avatar.svg" className="w-28 h-28" />
        <h1 className="text-center text-white text-base font-bold mt-2 tr">
          Hi, {customerInfo?.name || "user"} !
        </h1>
        <div className="coupon-profile flex items-center mt-4">
          <label className="text-white font-medium text-sm">You have</label>
          <div className="p-2 px-4 ml-2 bg-white rounded-full flex items-center">
            {/* <img src="/icons/coupon.svg" /> */}
            <CouponIcon className="w-8 mr-1 text-blue-dark-sky" />
            <span className="text-blue-primary text-sm font-semibold">
              15 Coupons
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderInfo