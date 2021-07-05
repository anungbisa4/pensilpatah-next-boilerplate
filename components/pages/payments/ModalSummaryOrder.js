import { useState } from "react";
import dynamic from "next/dynamic";

import { XIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { calcOrder } from "@/utils/filter";

const Modal = dynamic(() => import("@/components/Modal/Modal"));
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));
const CheckOrderIcon = dynamic(() =>
  import("@/components/Icons/CheckOrderIcon")
);

const ModalSummaryOrder = ({ openDetail, setOpenDetail }) => {
  const { product, order, shipping } = useSelector((state) => state);

  const orderType = order?.product_id_payment;
  const orderInfo = calcOrder(
    order?.detail_package,
    shipping?.mainCourier,
    order,
    orderType
  );

  const SummaryBody = ({ type, item }) => {
    if (type === "minipack") {
      return (
        <>
          <div className="flex justify-between space-x-2">
            <h3>Product</h3>
            <h3>{item?.order_minipack?.product_name || "n/a"}</h3>
          </div>
          <div className="flex justify-between">
            <h3> Package </h3>
            <h3>{item?.order_minipack?.package_name || "n/a"}</h3>
          </div>
          <div className="flex justify-between">
            <h3> Plan </h3>
            <h3>{item?.order_minipack?.plan_name || "n/a"}</h3>
          </div>
          <div className="flex justify-between">
            <h3> Activate Now </h3>
            <h3>
              {item?.order_minipack?.activation_process === "IMMEDIATE"
                ? "Yes"
                : "No" || "n/a"}
            </h3>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="flex justify-between space-x-2">
          <h3>{item?.detail_package?.PackageName}</h3>
          <h3>{<PriceFormat value={item?.totalPrice || 0} />}</h3>
        </div>
        <div className="flex justify-between">
          <h3> Biaya Pengiriman </h3>
          <h3>{<PriceFormat value={item?.totalShippingCost || 0} />}</h3>
        </div>
      </>
    );
  };

  const handleTotal = (type, item) => {
    if (type === "minipack") {
      return item?.total_amount || 0;
    }
    return item?.totalInvoice;
  };

  return (
    <>
      <Modal open={openDetail} toggle={() => setOpenDetail(!openDetail)}>
        {/* modal component must action button */}
        <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transform py-4">
          <button />
          <div className="mx-4 p-6 shadow-xl rounded-2xl bg-white">
            <div className="flex justify-between items-center py-4 pt-0">
              <div className="flex space-x-2 items-center">
                <CheckOrderIcon className="w-6 text-blue-primary" />
                <h3 className="text-sm font-semibold">Order Summary</h3>
              </div>
              <button
                className="outline-remove"
                onClick={() => setOpenDetail(!openDetail)}
              >
                <XIcon className="w-6 text-gray-light-dark" />
              </button>
            </div>
            <div className="divide-y-1 space-y-4 mt-4">
              <div className="content-summary text-xs space-y-2">
                <SummaryBody
                  type={orderType}
                  item={{ ...order, ...orderInfo }}
                />
              </div>
              <div className="py-4 pb-0 text-sm font-semibold">
                <div className="flex justify-between">
                  <h3> Total Invoice </h3>
                  <h3 className="text-blue-primary">
                    {" "}
                    {<PriceFormat value={orderInfo.totalInvoice} />}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalSummaryOrder;
