import { useState, useEffect } from "react";
import { ModalV2 } from "@/components/Modal";
import {
  CircleSuccessIcon,
  InfoCircleOutlineIcon,
  CircleSpinIcon,
} from "@/components/Icons";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { apiMinipackVoucher } from "@/utils/apiHandlers";
import * as Yup from "yup";

import Fade from "react-reveal/Fade";
import InputField from "@/components/Form/InputField";

const validationSchema = Yup.object({ voucher: Yup.string().required() });
const MinipackVoucherModal = ({ open, toggle }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorVoucher, setErrorVoucher] = useState(false);
  const { user } = useSelector((state) => state);
  // const [value, setValue]

  useEffect(() => {
    setSuccess(false);
  }, [open]);

  const handleActivationVoucher = ({ voucher }) => {
    const body = {
      email: user?.userChecker?.email,
      voucher_code: voucher,
    };
    setLoading(true);
    apiMinipackVoucher(body)
      .then((res) => setSuccess(true))
      .catch((err) => setErrorVoucher(true))
      .finally(() => {
        setLoading(false);
      });
  };

  const initialValues = { voucher: "" };

  return (
    <>
      <ModalV2 open={open} toggle={toggle}>
        <Fade bottom collapse when={open && !success} duration={500}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleActivationVoucher}
          >
            {({ errors, touched, values, isValid, dirty, ...props }) => {
              return (
                <Form className="absolute bottom-0 left-0 z-10 w-full p-6 text-left transform bg-white shadow-xl rounded-t-2xl space-y-6">
                  <h1 className="text-sm font-bold">Input Your Voucher Code</h1>
                  <div className="mx-auto w-full">
                    <InputField
                      name="voucher"
                      placeholder="Example: YTSVHJ376A "
                      className="w-full uppercase placeholder-gray-a1a1 bg-white bg-opacity-40 outline-remove text-sm border-1 border-gray-light-pink rounded-[6px] p-4 text-left font-medium"
                    />
                    <Fade
                      bottom
                      collapse
                      when={!errors.voucher && dirty && errorVoucher}
                      duration={500}
                    >
                      <div className="flex items-center space-x-2 mt-2">
                        <InfoCircleOutlineIcon className="w-4 text-red-error" />
                        <span className="text-10px text-red-error font-medium">
                          Your Voucher Code is Invalid
                        </span>
                      </div>
                    </Fade>
                  </div>
                  <button
                    disabled={errors.voucher || loading}
                    type="submit"
                    className="button-blue-gradient text-sm font-semibold py-4"
                  >
                    {loading && <CircleSpinIcon className="w-4 mr-2" />}
                    Redeem
                  </button>
                  <button
                    type="reset"
                    onClick={toggle}
                    className="remove-outline w-full text-center text-sm font-semibold text-blue-primary"
                  >
                    Cancel
                  </button>
                </Form>
              );
            }}
          </Formik>
        </Fade>
        <Fade bottom collapse when={open && success} duration={500}>
          <section className="absolute flex flex-col items-center justify-center bottom-0 left-0 z-10 w-full p-6 text-left transform bg-white shadow-xl rounded-t-2xl">
            <header className="flex justify-center flex-col items-center">
              <CircleSuccessIcon className="w-[56px] text-green-toast-success" />
              <h1 className="text-lg font-semibold text-center mt-4">
                Congratulations
              </h1>
            </header>
            <main className="pt-3 pb-6">
              <p className="text-center font-medium text-xs">
                Your voucher code is already use. Now you can enjoy minipack
                package
              </p>
            </main>
            <footer className="w-full">
              <button
                type="button"
                onClick={toggle}
                className="button-blue-gradient text-sm font-semibold py-4"
              >
                Done
              </button>
            </footer>
          </section>
        </Fade>
      </ModalV2>
    </>
  );
};
``;

export default MinipackVoucherModal;
