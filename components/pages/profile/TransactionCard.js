import { useState } from "react"
import Image from "next/image"
import DeliveryIcon from "@/components/Icons/DeliveryIcon"
import Link from "next/link"
import StartIcon from "@/components/Icons/StarIcon"
import Rating from "react-rating";
import PriceFormat from "@/components/Filter/PriceFormat";

import { ChevronRightIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux"

const TransactionCard = ({item}) => {
  
  console.log(item)
  return (
    <>
      <div className="transaction-card relative p-3 bg-white rounded-2xl overflow-hidden shadow-md2 m-4 flex flex-col">
        <button className="active:opacity-70 outline-remove w-full">
          <div className="flex w-full mb-4">
            <div className="w-1/3">
              <div className={`overflow-hidden rounded-xl bg-gray-200`}>
                <Image
                  src={item.thumbnail_img || "/img/no-image.webp"}
                  alt={item.product_name || "missing image"}
                  width={50}
                  height={50}
                  layout="responsive"
                />
              </div>
            </div>
            <div className="w-2/3 ml-4 flex flex-col justify-between">
              <div className="text-xs flex justify-between">
                <span>{item.transaction_date_fmt}</span>
                <span
                  className={`${
                    item.payment_status === "UNPAID"
                      ? "text-failed"
                      : "text-success "
                  } font-semibold`}
                >
                  {item.payment_status}
                </span>
              </div>
              <div className="text-left">
                <h2 className="text-sm font-semibold line-clamp-2">
                  {item.product_name}
                </h2>
                <p className="text-xs line-clamp-2">
                  {item.product_description}
                </p>
              </div>
              <div className="text-xs flex justify-between items-center">
                <span>{item.product_qty}x Package</span>
                <span className="text-blue-primary text-sm font-semibold">
                  {<PriceFormat value={item.product_amount} />}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-light-pink p-2 text-xs">
            <span>{item.product_qty}x Package</span>
            <div>
              <span>Total Invoice:</span>
              <span className="text-blue-primary text-sm font-semibold ml-4">
                {<PriceFormat value={item.total_invoice} />}
              </span>
            </div>
          </div>
        </button>
        <div className="relative z-10 flex justify-between py-2 text-xs border-b-1">
          <div className="flex items-center">
            <DeliveryIcon className="w-4 text-gray-brownish mr-1" />
            <p>
              ( Receiver : {item.receiver_name} ) :{" "}
              {item.delivery_status || "Delivered"}
            </p>
          </div>
          <ChevronRightIcon className="relative z-10 w-4 text-blue-primary" />
        </div>
        <div className="flex justify-between items-center text-xs py-4">
          <div className="flex items-center">
            <Rating
              className="star-rating"
              readonly
              initialRating={4}
              emptySymbol={<StartIcon className="text-gray-warm w-5 pr-1" />}
              placeholderSymbol={
                <StartIcon className="text-yellow-400 w-5 pr-1" />
              }
              fullSymbol={<StartIcon className="text-yellow-400 w-5 pr-1" />}
            />
            <span>(10 Purchase)</span>
          </div>
          <div className="w-24">
            <Link
              href={`/buy-confirmation?id_package=${item.package_id}&title_package=${item.product_name}`}
              as={`/buy-confirmation/${item.package_id}/${item.product_name}`}
            >
              <button
                type="button"
                className="relative z-10 button-blue-gradient text-xs"
              >
                Buy Again
              </button>
            </Link>
          </div>
        </div>
        <Link
          href={`/transaction/[transaction_id]/detail`}
          as={`/transaction/${item?.transaction_id}/detail`}
        >
          <a
            className="absolute top-0 left-0 active:opacity-50 outline-remove w-full h-full bg-gray-50 opacity-0"
          />
        </Link>
      </div>
    </>
  );
}

export default TransactionCard