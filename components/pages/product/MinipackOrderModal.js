import { useState, useEffect, useContext } from "react";
import { ModalV2 } from "@/components/Modal";
import { setProductCode, setOrderMinipack } from "@/store/order/action";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Fade from "react-reveal/Fade";
import PriceFormat from "@/components/Filter/PriceFormat";

const MinipackOrderModal = ({ open, toggle, dataOrder }) => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setSuccess(false);
  }, [open]);

  const handleSubmit = () => {
    dispatch(setProductCode("minipack"));
    dispatch(setOrderMinipack(dataOrder));
    router.push("/payments");
  };
  return (
    <>
      <ModalV2 open={open} toggle={toggle}>
        <Fade
          bottom
          collapse
          when={open && !success}
          duration={500}
          delay={300}
        >
          <section className="absolute bottom-0 left-0 z-10 w-full p-6 text-left transform bg-white shadow-xl rounded-t-2xl space-y-6">
            <h1 className="text-sm font-bold">Order Summary</h1>
            <div className="grid grid-cols-2 text-xs font-medium gap-2">
              <label>Product</label>
              <span className="text-right">{dataOrder?.product_name}</span>
              <label>Package</label>
              <span className="text-right">{dataOrder?.package_name}</span>
              <label>Plan</label>
              <span className="text-right">{dataOrder?.plan_name}</span>
              <label>Activate Now</label>
              <span className="text-right">
                {dataOrder?.activation_process === "IMMEDIATE" ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex text-sm font-bold justify-between">
              <label>Total</label>
              <span className="text-right">
                <PriceFormat value={dataOrder?.total_amount} />
              </span>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="button-blue-gradient text-sm font-semibold py-4"
              >
                Proceed to Payment
              </button>
              <button
                type="reset"
                onClick={toggle}
                className="remove-outline w-full text-center text-sm font-semibold text-blue-primary py-4"
              >
                Cancel
              </button>
            </div>
          </section>
        </Fade>
      </ModalV2>
    </>
  );
};
``;

export default MinipackOrderModal;
