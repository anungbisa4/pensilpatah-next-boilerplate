import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types"

const ItemCardPayment = ({ title, detail, imgSrc, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="item-card-payment relative w-full flex items-center bg-white p-4 py-4 pr-8 rounded-lg shadow-md2 cursor-pointer active:opacity-70"
      >
        <div className="w-45pt h-45pt relative bg-white overflow-hidden rounded-lg items-center">
          <Image
            src={imgSrc || "/img/bank-mega.jpg"}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className="ml-4">
          <h2 className="content-name text-sm font-semibold">{title}</h2>
          <h4 className="content-detail text-xs leading-none text-gray-brownish">
            {detail}
          </h4>
        </div>
        <a className="absolute right-2 text-gray-bluey">
          <ChevronRightIcon className="w-5 h-5 sm:w-7 sm:h-7 md:w-12 md:h-12" />
        </a>
      </div>
    </>
  );
};

ItemCardPayment.propTypes = {
  onClick: PropTypes.func
}
ItemCardPayment.defaultProps = {
  onClick: () => ""
}

export default ItemCardPayment;
