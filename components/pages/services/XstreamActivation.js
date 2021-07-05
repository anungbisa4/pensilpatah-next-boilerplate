import { useState, useEffect } from "react";
// import MainBanner from "@/components/Banner/MainBanner";
import { Formik, Form } from "formik";
import { CardInformation } from "@/components/Card";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { userInfo, customerInfo } from "@/store/user/action";
import { apiXstreamActivation } from "@/utils/apiHandlers";
import { ToastContainer, toast } from "react-toastify";

import dynamic from "next/dynamic";
import EyeIcon from "@/components/Icons/EyeIcon";
import base64 from "base-64";

const InputField = dynamic(() => import("@/components/Form/InputField"));
const CheckBox = dynamic(() => import("@/components/Form/Checkbox"));
const ModalTncServices = dynamic(() =>
  import("@/components/pages/services").then((mod) => mod.ModalTncServices)
);
const CircleSpinIcon = dynamic(() =>
  import("@/components/Icons").then((mod) => mod.CircleSpinIcon)
);
const Toast = dynamic(() =>
  import("@/components/Toast").then((mod) => mod.Toast)
);

export default function XstreamActivation() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { user } = useSelector((state) => state);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customerInfo(user?.userChecker?.email));
  }, []);

  const handleActivation = (values) => {
    setLoadingSubmit(true);
    const encodePassword = base64.encode(values.password) || null;
    const body = {
      email: values.username,
      voucher_code: values.voucherCode,
      box_pw: encodePassword,
    };
    apiXstreamActivation(body)
      .then((res) => {
        setLoadingSubmit(false);
        router.reload();
      })
      .catch((err) => {
        setLoadingSubmit(false);
        const errorMsg = err.err.response?.data?.message[0];
        toast.error(<Toast value={errorMsg || "error"} status="error" />, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1500,
          toastId: "success-toast",
          delay: 100,
        });
      });
  };
  const handleTnc = () => setOpen(!open);

  return (
    <>
      <section className="px-6 py-8">
        <div className="w-60 min-h-[160px] mx-auto">
          {/* <MainBanner
            src="/dummy-img/xstream-service.webp"
            width={240}
            height={155}
            alt="xstream activation"
            unoptimized
          /> */}
          <img src="/dummy-img/xstream-service.webp" alt="xstream activation" />
        </div>
        <div className="form-xstream-activation max-w-xs mx-auto">
          <h1 className="py-8 font-bold text-xl text-center">
            Activate Your Xtream Box With Your Email
          </h1>
          <Formik
            className="mt-12"
            initialValues={{
              username: user?.userChecker?.email,
              password: "",
              voucherCode: "",
              agreement: false,
            }}
            onSubmit={(values) => handleActivation(values)}
          >
            {({ errors, touched, values, isValid, dirty, ...props }) => {
              isValid = false;
              values.agreement = agree;
              if (values.username && values.password && values.agreement) {
                isValid = true;
              }
              return (
                <Form className="relative">
                  <div className="space-y-4">
                    <InputField
                      name="username"
                      readOnly
                      placeholder="Username"
                      className={`border-gray-light-dark text-sm leading-0 relative text-center w-full border placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-4 px-6 rounded-full`}
                    />
                    <div className="relative">
                      <div
                        className="absolute z-10 p-2 flex border border-transparent right-0 top-0 h-full w-14"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <EyeIcon
                          className={`cursor-pointer w-6 ${
                            showPassword
                              ? "text-blue-primary"
                              : "text-gray-light-dark"
                          }`}
                        />
                      </div>
                      <InputField
                        name="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className={`border-gray-light-dark text-sm leading-0 relative text-center w-full border placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-4 px-6 rounded-full`}
                      />
                    </div>
                    <InputField
                      name="voucherCode"
                      placeholder="Voucher Code"
                      className={`border-gray-light-dark text-sm leading-0 relative text-center w-full border placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-4 px-6 rounded-full`}
                    />
                    <div className="ml-4 flex items-center w">
                      <CheckBox
                        containerClass="mr-2 w-[14px] h-[14px] !border-1"
                        checkClass="w-5 h-5"
                        toggle={setAgree}
                        checked={agree}
                      />
                      <span className="text-xs text-gray-warm">
                        Agree{" "}
                        <button
                          type="button"
                          onClick={handleTnc}
                          className="text-blue-primary outline-remove"
                        >
                          terms & condition
                        </button>
                      </span>
                    </div>
                  </div>
                  <CardInformation iconClass="text-blue-primary">
                    <p className="pt-2 leading-[18px] text-xs font-medium">
                      Your email can be associated with Transvision Xtream Box
                    </p>
                  </CardInformation>
                  <div className=" flex w-full justify-center py-8">
                    <button
                      disabled={!isValid || loadingSubmit}
                      type="submit"
                      className="button-blue-gradient py-3 text-sm font-semibold"
                    >
                      {loadingSubmit && (
                        <CircleSpinIcon className="w-4 text-gray-warm mr-2" />
                      )}
                      Activate Now
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
      <ModalTncServices open={open} setOpen={setOpen} setAgree={setAgree} />
      <ToastContainer
        toastClassName={({ type }) => {
          return `relative flex p-2 m-4 my-6 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer ${
            type === "error" ? "bg-red-dark" : "bg-green-toast-success"
          }`;
        }}
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="bottom-center"
        hideProgressBar={false}
        draggable={true}
      />
    </>
  );
}
