import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiCheckOrder } from "@/utils/apiHandlers";

import dynamic from "next/dynamic";
import jwt_decode from "jwt-decode";
// loader
import ScreenLoader from "@/components/Loader/ScreenLoader";

const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));

const BankMegaStatus = ({ orderId }) => {
  const [image, setImage] = useState("/img/women-with-wallet.svg");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");
  const router = useRouter();
  const [data, setData] = useState({});

  useEffect(() => {
    let unmounted = false;
    const getOrderCheck = () => {
      apiCheckOrder(orderId)
        .then((res) => {
          if (!unmounted) {
            setLoading(false);
            if (res.status === 200) {
              setStatus("success");
              setImage("/img/women-with-wallet.svg");
              setData(jwt_decode(res.data.result));
            }
          }
        })
        .catch((err) => {
          if (!unmounted) {
            setLoading(false);
            setImage("/img/man-stop.svg");
            setStatus("failed");
          }
        });
    };

    getOrderCheck();

    return () => {
      unmounted = true;
    };
  }, []);
  const handleLink = (type) => {
    if (type === "home") {
      return router.push("/");
    }
  };

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <section className="bank-mega-status flex items-center justify-center py-12">
        <main className="flex flex-col justify-center space-y-[48px]">
          <div className="w-[314px] mx-auto">
            <MainBanner
              src={image}
              width={314}
              height={287}
              className="overflow-hidden rounded-full"
              bgTransparent
            />
          </div>
          <div className="flex justify-center flex-col space-y-6">
            {status === "success" && (
              <>
                <h1 className="text-xl font-bold text-blue-primary text-center">
                  Payment Successful
                </h1>
                <div className="flex justify-center flex-col space-y-4">
                  <h2 className="text-2xl font-bold text-center">
                    <PriceFormat value={data?.items?.[0].amount} />
                  </h2>
                  <span className="text-sm font-semibold text-center text-gray-warm">
                    8 Jun 2021
                  </span>
                </div>
                <div className="flex justify-center flex-col">
                  <h2 className="text-sm font-semibold text-center">
                    Payment Method
                  </h2>
                  <div className="w-[56px] mx-auto pt-4">
                    <MainBanner
                      src="/img/logoBankMega.png"
                      width={56}
                      height={34}
                      className="overflow-hidden"
                      bgTransparent
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center pt-2">
                    Mega Credit Card
                  </h3>
                </div>
                <p className="text-center w-[211px] mx-auto text-sm font-medium">
                  Thank you for your payment. You can see your invoice{" "}
                  <a href="#" className="text-blue-primary">
                    here
                  </a>
                </p>
              </>
            )}
            {status === "pending" && (
              <>
                <h1 className="text-xl font-bold text-yellow-dark text-center">
                  Payment Pending
                </h1>
                <p className="text-center w-[256px] mx-auto text-sm font-medium">
                  Transaction payment is in progress. Please wait until it's
                  done
                </p>
              </>
            )}
            {status === "failed" && (
              <>
                <h1 className="text-xl font-bold text-red-dark text-center">
                  Payment Failed
                </h1>
                <p className="text-center w-[256px] mx-auto text-sm font-medium">
                  Your transaction payment has failed. Please try again
                </p>
              </>
            )}
          </div>
          <div className="flex justify-center flex-col space-y-3">
            <div className="w-[328px] mx-auto">
              <button
                type="button"
                className={`py-4 text-sm font-semibold
                  ${
                    status === "success"
                      ? "button-blue-gradient"
                      : status === "pending"
                      ? "button-yellow-gradient"
                      : status === "failed"
                      ? "button-red-gradient"
                      : "button-blue-gradient"
                  }
                `}
              >
                {status === "success"
                  ? "Track Order Status"
                  : status === "pending"
                  ? "Transaction History"
                  : status === "failed"
                  ? "Back to Payment"
                  : "Track Order Status"}
              </button>
            </div>
            <div className="w-[328px] mx-auto">
              <button
                type="button"
                className={`button-blue-primary py-4 text-sm font-semibold  active-button-white
                  ${
                    status === "success"
                      ? "bg-blue-soft text-blue-primary"
                      : status === "pending"
                      ? "bg-yellow-soft text-yellow-dark"
                      : status === "failed"
                      ? "bg-red-50 text-red-dark"
                      : "bg-blue-soft text-blue-primary"
                  }
                `}
                onClick={() => handleLink("home")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default BankMegaStatus;
