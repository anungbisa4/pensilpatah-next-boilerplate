import dynamic from "next/dynamic";
import NumberFormat from "react-number-format";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  apiCreateOrderXstream,
  apiPaymentInquiry,
  apiCreateOrderMinipack,
} from "@/utils/apiHandlers";
import { setPaymentCode, clearOrder } from "@/store/order/action";
import { useRouter } from "next/router";
import { calcOrder } from "@/utils/filter";
import { PaymentInfoCard } from "@/components/pages/payments";

const ModalSummaryOrder = dynamic(() =>
  import("@/components/pages/payments/ModalSummaryOrder")
);
const SecureIcon = dynamic(() => import("@/components/Icons/SecureIcon"));
const ScreenLoader = dynamic(() => import("@/components/Loader/ScreenLoader"));

const info = {
  transvision: {
    title: "Transvision Payment Code",
    logo: "/img/trvLogo.svg",
    type: "transvision",
    details: [
      "This transaction will automatically use the Transvision Payment Code for the payment method to be used",
      "You will get the payment code after clicking “Pay Now”",
      "It is not recommended to pay through other banks so that transactions can be processed without problems",
    ],
  },
  bank_mega_credit: {
    title: "Mega Credit",
    type: "bank_mega",
    logo: "/img/bank-mega.jpg",
    details: [
      "This transaction will automatically use the Bank Mega Credit for the payment method to be used",
      `You will be directed to the Bank Mega Credit payment page after clicking "Pay Now"`,
      "It is not recommended to pay through other banks so that transactions can be processed without problems",
    ],
  },
};

const PaymentConfirmation = ({ paymentType }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailInfo, setDetailInfo] = useState([]);
  const { product, user, order, shipping } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (paymentType === "bank_mega_credit") {
      return setDetailInfo(info.bank_mega_credit);
    }
    if (paymentType === "transvision") {
      return setDetailInfo(info.transvision);
    }
  }, []);

  const orderType = order?.product_id_payment;
  const orderInfo = calcOrder(
    order?.detail_package,
    shipping?.mainCourier,
    order,
    orderType
  );

  const createOrder = () => {
    setIsLoading(true);
    const paymentMethodId =
      paymentType === "bank_mega_credit" ? 3 : paymentType === "allo" ? 2 : 4;

    if (orderType === "42") {
      orderCreateXstream(paymentMethodId);
    }
    if (orderType === "minipack") {
      orderCreateMinipack(paymentMethodId);
    }
  };

  const orderCreateXstream = (paymentMethodId) => {
    const paramsOrder = {
      PackageId: parseInt(product?.detail_package?.PackageId),
      Email: user?.customerInfo?.email,
      CustomerAddressId: shipping?.idMainAddress,
      CourierId: "JNE",
      CourierPackageCode: shipping?.mainCourier?.code,
      CourierPackageLabel: shipping?.mainCourier?.label,
      TotalProductPrice: orderInfo.totalPrice,
      CourierFee: orderInfo.totalShippingCost,
      PaymentMethodId: paymentMethodId,
      Qty: orderInfo.quantity,
      CityCode: shipping?.data_courier?.cityCode,
    };
    apiCreateOrderXstream(paramsOrder)
      .then((res) => {
        if (res?.data?.result?.PaymentCode) {
          setIsLoading(false);
          dispatch(setPaymentCode(res?.data?.result?.PaymentCode));
          if (paymentType === "bank_mega_credit") {
            const paymentCode = res?.data?.result?.PaymentCode;
            return paymentInquiry(paymentCode);
          }
          router.push("/payment-status/code");
          // dispatch(clearOrder());
        }
        // router.push(item.link, item.link, { shallow: true })
      })
      .catch((err) => setIsLoading(false));
  };

  const orderCreateMinipack = (paymentMethodId) => {
    const paramsOrder = {
      email: order?.order_minipack?.email,
      package_id: order?.order_minipack?.package_id,
      minipack_id: order?.order_minipack?.minipack_id,
      payment_method_id: paymentMethodId,
      total_amount: order?.order_minipack?.total_amount,
      receiver_email: order?.order_minipack?.receiver_email,
      receiver_type: order?.order_minipack?.receiver_type,
      activation_process: order?.order_minipack?.activation_process,
    };
    apiCreateOrderMinipack(paramsOrder)
      .then((res) => {
        if (res?.data?.result?.payment_code) {
          setIsLoading(false);
          dispatch(setPaymentCode(res?.data?.result?.payment_code));
          if (paymentType === "bank_mega_credit") {
            const paymentCode = res?.data?.result?.payment_code;
            return paymentInquiry(paymentCode);
          }
          router.push("/payment-status/code");
        }
      })
      .catch((err) => setIsLoading(false));
  };

  const paymentInquiry = (paymentCode) => {
    setIsLoading(true);
    let item = [];
    item.push({
      name: orderInfo.productName,
      quantity: 1,
      amount: orderInfo.price || 79000,
    });
    const paramsOrder = {
      amount: parseInt(orderInfo.totalPrice) || 79000,
      disablePromo: true,
      items: item,
      customer_name: user?.customerInfo?.name,
      customer_email: user?.customerInfo?.email,
      customer_phone: user?.customerInfo?.phone_number,
      postalCode: shipping?.activeAddress?.customer_zipcode || 9999,
      paymentSource: "megacc",
      referenceUrl: `http://www-dev.transvisionplus.com?order_id=${paymentCode}`,
      transaction_no: paymentCode,
    };

    apiPaymentInquiry(paramsOrder)
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          const {
            data: {
              result: {
                urls: { checkout },
              },
            },
          } = res;
          router.push(checkout);
        }
      })
      .catch((err) => setIsLoading(false));
  };

  const onPayment = () => {
    createOrder();
  };

  const MainContent = () => (
    <>
      <div className="payment-content relative min-h-screen overflow-hidden bg-gray-100 rounded-t-2xl fixed overflow-x-hidden overflow-y-scroll h-full w-full pb-36 mb-10">
        <div className=" px-6">
          <div className="my-4 p-4 bg-white rounded-2xl space-y-4">
            <div className="text-black font-semibold flex justify-between items-center">
              <div>
                <label className="text-sm">Total Payment</label>
                <h2 className="text-lg text-blue-primary font-bold">
                  <NumberFormat
                    value={orderInfo.totalInvoice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpenDetail(!openDetail)}
                className="text-sm font-semibold text-blue-primary outline-remove"
              >
                See Details
              </button>
            </div>
          </div>

          <PaymentInfoCard info={detailInfo} />
        </div>
      </div>
      <div className="absolute  px-6  bottom-0 w-full flex items-center justify-center">
        <div className="p-4 w-full">
          <div className="w-full mx-auto">
            <button
              type="button"
              className="button-blue-primary gradient-blue mb-4 text-sm"
              onClick={onPayment}
            >
              Pay Now
            </button>
          </div>
          <div className="flex justify-center items-center">
            <SecureIcon className="w-4 text-gray-light-dark" />
            <span className="text-gray-light-dark pl-1 text-xs">
              Payment Secure
            </span>
          </div>
        </div>
      </div>
      <ModalSummaryOrder
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />
    </>
  );

  return <>{isLoading ? <ScreenLoader /> : MainContent()}</>;
};

export default PaymentConfirmation;
