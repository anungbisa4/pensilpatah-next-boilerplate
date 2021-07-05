import dynamic from "next/dynamic"
import NumberFormat from "react-number-format";
import PropTypes from "prop-types"

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router"

const BuyProduct = ({label, titleAction, disableAction, onBuy, value, ...props}) => {
  const { user } = useSelector((state) => state);
  const router = useRouter()

  const handleClick = () => {
    if (!user?.userChecker?.isLoggedIn) {
      return router.push(`/login?${btoa(router.asPath)}`);
    }
    return onBuy()
  }

  return (
    <>
      <div className="buy-product-wrapper fixed flex w-full bg-white z-75 bottom-0 shadow-up">
        <div className=" flex w-full justify-between items-center p-4 px-6 font-semibold">
          <div>
            <label className="text-sm leading-none">
              {label || "Total Price:"}{" "}
            </label>
            <h2 className="leading-none text-xl text-blue-primary">
              <NumberFormat
                value={value}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp. "}
              />
            </h2>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="flex mx-auto text-white font-bold items-center bg-blue-primary border-2  py-2 px-12 focus:outline-none  rounded-full disabled:opacity-50 disabled:bg-gray-light-dark"
              disabled={disableAction}
            >
              {titleAction || "Buy"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

BuyProduct.defaultProps = {
  onBuy: () => ""
}
BuyProduct.propTypes = {
  onBuy: PropTypes.func
}

export default BuyProduct