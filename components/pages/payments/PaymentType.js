import { useState } from "react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

const ItemCardPayment = dynamic(() =>
  import("@/components/pages/payments/ItemCardPayment")
);

const listPayment = [
  {
    label: "Allo Payment",
    title: "Allo Pay",
    detail: "Pay with balance & get 10% cashback",
    img: "/img/allo-bank.png",
    link: "/payment-status",
    as: "/payment-status",
  },
  {
    label: "Bank Mega",
    title: "Bank Mega",
    detail: "Enjoy 10% discount for every purchase",
    img: "/img/bank-mega.jpg",
    link: "/choose-bank",
    as: "/choose-bank",
  },
  {
    label: "Transvision",
    title: "Transvision Payment Code",
    detail: "Enjoy 15% discount for every purchase",
    img: "/img/bank-transvision.png",
    link: "/payment/confirmation?payment_type=transvision",
    as: "/payment/confirmation?payment_type=transvision",
  },
];

const PaymentType = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onPayment = (item) => {
    return router.push(item.link, item.as, { shallow: true });
  };
  return (
    <>
      {listPayment.map((item, index) => {
        return (
          <div key={index} className="payment-type mb-6">
            <h2 className="font-semibold mb-2 text-lg">{item.label}</h2>
            <ItemCardPayment
              title={item.title}
              detail={item.detail}
              onClick={() => onPayment(item)}
              imgSrc={item.img}
            />
          </div>
        );
      })}
    </>
  );
};

export default PaymentType;
