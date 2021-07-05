import dynamic from "next/dynamic";
import NumberFormat from "react-number-format";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calcOrder } from "@/utils/filter";

const ModalSummaryOrder = dynamic(() =>
  import("@/components/pages/payments/ModalSummaryOrder")
);
const Stepper = dynamic(() => import("@/components/Stepper/Stepper"));
const PaymentType = dynamic(() =>
  import("@/components/pages/payments/PaymentType")
);

const list = [
  { title: "Invoice" },
  { title: "Payment" },
  { title: "Complete" },
];
const PaymentContent = ({ ...props }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const { order, shipping } = useSelector((state) => state);

  const orderType = order?.product_id_payment;
  const orderInfo = calcOrder(
    order?.detail_package,
    shipping?.mainCourier,
    order,
    orderType
  );

  return (
    <>
      <div className="payment-content min-h-screen overflow-hidden bg-gray-100 rounded-t-2xl fixed overflow-x-hidden overflow-y-scroll h-full w-full pb-36 mb-10">
        <div className="stepper  px-12 p-8">
          <Stepper activeStep={2} listStep={list} />
        </div>
        <div className="total-payment my-4 py-4 bg-gray-light-pink">
          <div className=" px-6">
            <div className="text-black font-semibold flex justify-between items-center">
              <label className="text-sm">Total Payment</label>
              <button
                type="button"
                onClick={() => setOpenDetail(!openDetail)}
                className="text-sm font-semibold text-blue-primary outline-remove"
              >
                See Details
              </button>
            </div>
            <h2 className="text-lg text-blue-primary font-bold">
              <NumberFormat
                value={orderInfo.totalInvoice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp. "}
              />
            </h2>
          </div>
        </div>
        <div className="type-payment  p-4 px-6">
          <PaymentType />
        </div>
      </div>
      <ModalSummaryOrder
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />
    </>
  );
};

export default PaymentContent;
