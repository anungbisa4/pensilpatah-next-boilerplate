import dynamic from "next/dynamic";
import Image from "next/image";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultCourier } from "@/store/shipping/action";
import { setProductCode } from "@/store/order/action";
import { calcOrder } from "@/utils/filter";

const Stepper = dynamic(() => import("@/components/Stepper/Stepper"));
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));
const CardShipping = dynamic(() =>
  import("@/components/pages/shipping/CardShipping")
);
const ShippingDialog = dynamic(() =>
  import("@/components/pages/shipping/ShippingDialog")
);
const Modal = dynamic(() => import("@/components/Modal/Modal"));
const BuyProduct = dynamic(() =>
  import("@/components/pages/buy-confirmation/BuyProduct")
);
const list = [
  { title: "Address" },
  { title: "Payment" },
  { title: "Complete" },
];

const Toast = () => (
  <>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <span>
          <CheckIcon className="w-6 text-white mr-3" />
        </span>
        <p>Successfully select shipping</p>
      </div>
    </div>
  </>
);
const DeliveryContent = ({ ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { order, shipping, user } = useSelector((state) => state);

  const [address, setAddress] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  const setShippingService = (item) => {
    dispatch(setDefaultCourier(item));
    setOpenShipping(!openShipping);
    toast.success(<Toast />, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      toastId: "success-toast",
      delay: 500,
    });
  };

  const orderType = order?.product_id_payment;
  const orderInfo = calcOrder(
    order?.detail_package,
    shipping?.mainCourier,
    order,
    orderType
  );

  const onPayment = () => {
    dispatch(setProductCode(order?.detail_package?.ProductId));
    router.push("/payments", `/payments`, {
      shallow: true,
    });
  };

  return (
    <>
      <div className=" delivery-content bg-gray-100 rounded-t-2xl fixed overflow-x-hidden overflow-y-scroll h-full w-full pb-40 mb-10">
        <div className="">
          <div className="stepper px-12 p-8">
            <Stepper activeStep={1} listStep={list} />
          </div>
          <div className="delivery-content px-8 mt-4 space-y-4">
            <CardShipping
              withBorderBottom
              withAction
              title="Shipping address"
              titleAction={shipping?.isAddress ? "Change" : "Add"}
              addressActive={shipping?.main_address}
              onChange={() => {
                if (shipping?.isAddress) {
                  return router.push(
                    "/all-address/[name]",
                    "/all-address/shipping",
                    {
                      shallow: true,
                    }
                  );
                }
                return router.push("/address/[name]", "address/create", {
                  shallow: true,
                });
              }}
            >
              {shipping?.main_address ? (
                <p
                  className="text-xs p-4 sm:text-sm bg-blue-pale"
                  dangerouslySetInnerHTML={{
                    __html: shipping?.main_address,
                  }}
                />
              ) : (
                <p className="text-xs sm:text-sm">
                  No shipping address, please set up your shipping address
                </p>
              )}
            </CardShipping>
            <CardShipping
              title="Shipping service"
              withAction
              onChange={() => setOpenShipping(true)}
            >
              <div className="grid grid-cols-2 text-xs sm:text-sm">
                <div>
                  <label>Courer</label>
                </div>
                <div className="text-right font-semibold">
                  {shipping?.main_address ? shipping?.mainCourier?.label : "-"}
                </div>
                <div>
                  <label>Service type</label>
                </div>
                <div className="text-right font-semibold">
                  {shipping?.main_address ? shipping?.mainCourier?.type : "-"}
                </div>
                <div>
                  <label>Shipping cost</label>
                </div>
                <div className="text-right font-semibold">
                  {shipping?.main_address ? (
                    <PriceFormat value={shipping?.mainCourier?.price} />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </CardShipping>
            <CardShipping title="Order summary">
              <div className="grid grid-cols-3 text-xs sm:text-sm">
                <div className="col-span-2 truncate">
                  <label>{order?.detail_package?.PackageName}</label>
                </div>
                <div className="text-right font-semibold">
                  <PriceFormat value={orderInfo.totalPrice} />
                </div>
                <div className="col-span-2">
                  <label>Shipping costs</label>
                </div>
                <div className="text-right font-semibold">
                  <PriceFormat value={orderInfo.totalShippingCost || "-"} />
                </div>
                <div className="col-span-2 mt-4 text-sm sm:text-base font-bold text-blue-primary">
                  <label>Total invoice</label>
                </div>
                <div className="mt-4 text-right text-sm sm:text-base font-bold text-blue-primary">
                  <PriceFormat value={orderInfo.totalInvoice || "-"} />
                </div>
              </div>
            </CardShipping>
            <CardShipping title="Allo coupon">
              <div className="flex items-center text-xs sm:text-sm">
                <div className="w-45pt h-45pt relative bg-white overflow-hidden rounded-lg items-center">
                  <Image
                    src={"/img/allo-bank.png"}
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="contain"
                    quality={100}
                  />
                </div>
                <div className="ml-4">
                  <h2 className="content-name font-semibold">
                    Cashback 10% for every purchase Xstream Box!
                  </h2>
                </div>
              </div>
            </CardShipping>
          </div>
        </div>
      </div>
      <BuyProduct
        onBuy={onPayment}
        label="Total invoice"
        value={orderInfo.totalInvoice}
        titleAction="Pay"
        disableAction={!shipping?.mainCourier || !shipping?.main_address}
      />
      <Modal
        open={openShipping}
        toggle={() => setOpenShipping(!openShipping)}
        bottom
        as={Fragment}
      >
        <div className="absolute bottom-0 w-full p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl">
          <div className="flex">
            <button
              type="button"
              className="outline-remove"
              onClick={() => setOpenShipping(!openShipping)}
            >
              <XIcon className="text-gray-light-dark w-6" />
            </button>
            <h3 className="ml-2 font-bold items-center">Pilih Pengiriman</h3>
          </div>
          <div className="mt-2 text-sm divide-y-2 divide-gray-light-pink">
            {shipping?.data_courier?.rates?.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className="w-full py-3 cursor-pointer flex justify-between items-center outline-remove text-left active:bg-blue-100"
                  onClick={() => setShippingService(item)}
                >
                  <div>
                    <h3 className="font-bold pb-2">{item?.label}</h3>
                    <h3>Estimate arrived {item?.estimatedDay}</h3>
                  </div>
                  <div className="p-1 gradient-blue rounded-full">
                    <CheckIcon className="w-6 text-white" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
      <ToastContainer
        toastClassName={({ type }) =>
          "relative flex p-2 m-4 my-6 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-green-toast-success"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        draggable={true}
      />
    </>
  );
};

export default DeliveryContent;
