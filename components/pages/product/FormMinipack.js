import { useState, useEffect, useContext } from "react";
import { MinipackContext } from "@/utils/contexts/minipackContext";
import { useFormik } from "formik";
import { apiMinipackPackage } from "@/utils/apiHandlers";
import { useSelector } from "react-redux";
import { checkProperties } from "@/utils/filter";
import {
  EmailIcon,
  VoucherIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleUncheckIcon,
} from "@/components/Icons";

import Fade from "react-reveal/Fade";
import ListBox from "@/components/Form/ListBox";
import dynamic from "next/dynamic";

const MinipackOrderModal = dynamic(() =>
  import("./index").then((mod) => mod.MinipackOrderModal)
);
const MinipackVoucherModal = dynamic(() =>
  import("./index").then((mod) => mod.MinipackVoucherModal)
);
const MinipackListPackage = dynamic(() =>
  import("./index").then((mod) => mod.MinipackListPackage)
);
const MinipackListPlan = dynamic(() =>
  import("./index").then((mod) => mod.MinipackListPlan)
);

const FormMinipack = ({ ...props }) => {
  const { switchOrder } = useContext(MinipackContext);
  const { product, user } = useSelector((state) => state);
  const [minipackPackage, setMinipackPackage] = useState(null);
  const [minipackPlan, setMinipackPlan] = useState(null);
  const [selectProduct, setSelectProduct] = useState("default");
  const [selectPackage, setSelectPackage] = useState("default");
  const [selectPlan, setSelectPlan] = useState("default");
  const [activationProcess, setActivationProcess] = useState("");
  const [modal, setModal] = useState({
    voucher: false,
    orderSummary: false,
  });
  const myselfEmail = user?.userChecker?.email;
  const formik = useFormik({
    initialValues: {
      email: switchOrder ? "" : myselfEmail,
      package_id: "",
      minipack_id: "",
      product_name: "",
      package_name: "",
      plan_name: "",
      payment_method_id: 4,
      total_amount: "",
      receiver_email: myselfEmail,
      receiver_type: switchOrder ? "OTHER" : "SELF",
      activation_process: activationProcess,
    },
    onSubmit: (values) => {
      handleModal("order-summary");
    },
  });
  formik.isValid = !checkProperties(formik.values);

  useEffect(() => {
    formik.values.receiver_type = switchOrder ? "OTHER" : "SELF";
  }, [switchOrder]);

  const handlePackage = (itemPackage) => {
    setSelectPackage(itemPackage.minipack);
    setMinipackPlan(itemPackage?.plans);
    formik.values.package_name = itemPackage.minipack;
  };
  const handlePlan = (itemPlan) => {
    setSelectPlan(itemPlan.product_name);
    formik.values.minipack_id = itemPlan.minipack_id;
    formik.values.total_amount = itemPlan.price;
    formik.values.plan_name = itemPlan.product_name;
  };
  const handleVoucher = () => setModal({ ...modal, voucher: !modal.voucher });

  const handleModal = (type) => {
    if (type === "voucher") {
      return handleVoucher();
    }
    return setModal({ ...modal, orderSummary: !modal.orderSummary });
  };

  const handleChange = (item) => {
    apiMinipackPackage(item?.PackageId)
      .then((res) => {
        if (res.status === 200) {
          formik.values.package_id = item.PackageId;
          formik.values.product_name = item.PackageName;
          formik.values.minipack_id = "";
          formik.values.activation_process = "";
          formik.values.total_amount = "";
          setMinipackPackage(res.data.result);
          setMinipackPlan(null);
          setSelectPackage(null);
          setSelectPlan(null);
          setActivationProcess(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ActivationProcess = ({ status, activation }) => {
    if (status === "CLAIM" && activation === "no") {
      return <CircleCheckIcon className="w-3 text-blue-primary" />;
    }
    if (status === "IMMEDIATE" && activation === "yes") {
      return <CircleCheckIcon className="w-3 text-blue-primary" />;
    }
    return <CircleUncheckIcon className="w-3 text-gray-warm" />;
  };

  const handleActivation = (status) => {
    setActivationProcess(status);
    formik.values.activation_process = status;
  };

  return (
    <>
      <section className="mt-6 mb-40">
        <form className="space-y-6">
          <div className="px-6">
            <Fade bottom collapse when={!switchOrder} duration={500}>
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-white px-[18px] py-[5px]  rounded-full shadow-sm">
                  <EmailIcon className="w-4" />
                  <span className="pl-2 text-xs font-medium">
                    {myselfEmail}
                  </span>
                </div>
              </div>
            </Fade>
            <Fade bottom collapse when={switchOrder} duration={500}>
              <div className="input-other-minipack flex flex-col">
                <label className="text-xs font-medium mb-2">Insert Email</label>
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  className="input-focus-outline text-xs font-medium px-3 py-[15px] rounded-[6px] shadow-sm"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
            </Fade>
          </div>
          <div className="flex flex-col px-6">
            <label className="text-xs font-medium mb-2">Select Product</label>
            <div className="flex justify-between items-center ">
              <ListBox
                label="Product"
                selected={selectProduct}
                setSelected={setSelectProduct}
                list={product?.minipack_product}
                defaultItemClass="listbox-minipack bg-white rounded-[6px] px-3 py-[15px] border-gray-300 !text-left shadow-sm"
                activeList="bg-gray-light-pink text-black"
                textDefaultClass="text-xs"
                textItemClass="!text-left px-3 py-2"
                suffixClass="pr-[16px]"
                listItemClass="max-h-40 shadow-sm rounded-[6px] border-0"
                itemTitle="PackageName"
                onChange={(productChanged) => handleChange(productChanged)}
              />
            </div>
          </div>

          <section>
            <Fade
              left
              collapse
              when={minipackPackage?.length > 0}
              duration={500}
            >
              <div className="flex flex-col h-[168px]">
                <label className="text-xs font-medium mb-2 px-6">
                  Select Your Package
                </label>
                <div className="">
                  <MinipackListPackage
                    selectPackage={selectPackage}
                    setSelectPackage={setSelectPackage}
                    handlePackage={handlePackage}
                    listPackage={minipackPackage}
                  />
                </div>
              </div>
            </Fade>
            <Fade left collapse when={minipackPlan?.length > 0} duration={500}>
              <div className="flex flex-col mt-[16px!important] h-[86px]">
                <label className="text-xs font-medium mb-2 px-6">
                  Select Your Plan
                </label>
                <div className="">
                  <MinipackListPlan
                    selectPlan={selectPlan}
                    setSelectPlan={setSelectPlan}
                    handlePlan={handlePlan}
                    listPlan={minipackPlan}
                  />
                </div>
              </div>
            </Fade>
            <Fade
              left
              collapse
              when={minipackPlan?.length > 0 && !switchOrder}
              duration={500}
            >
              <div className="flex flex-col px-6">
                <label className="text-xs font-medium mb-2">
                  Are you wan to activate this now?
                </label>
                <div className="flex space-x-6">
                  <button
                    type="button"
                    onClick={() => handleActivation("IMMEDIATE")}
                    className="outline-remove flex items-center space-x-2 text-xs font-medium"
                  >
                    <ActivationProcess
                      status={activationProcess}
                      activation="yes"
                    />
                    <span>Yes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActivation("CLAIM")}
                    className="outline-remove flex items-center space-x-2 text-xs font-medium"
                  >
                    <ActivationProcess
                      status={activationProcess}
                      activation="no"
                    />
                    <span>No</span>
                  </button>
                </div>
              </div>
            </Fade>
          </section>
          <div className="w-[264px] mx-auto my-[40px!important] transition-all duration-500 ease-linear">
            <button
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
              type="submit"
              className="button-blue-gradient text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      <button
        type="button"
        onClick={handleVoucher}
        className="outline-remove fixed bottom-0 left-0 p-6 py-[17px] bg-white w-full flex justify-between items-center border-t-1"
      >
        <div className="flex items-center">
          <VoucherIcon className="h-[20px] text-black pb-[1px] mr-3" />
          <span className="text-xs font-medium leading-none">
            I Already Have Voucher
          </span>
        </div>
        <div>
          <ChevronRightIcon className="w-4 text-black" />
        </div>
      </button>
      <MinipackVoucherModal
        open={modal.voucher}
        toggle={() => handleModal("voucher")}
      />
      <MinipackOrderModal
        open={modal.orderSummary}
        toggle={() => handleModal("order-summary")}
        dataOrder={formik.values}
      />
    </>
  );
};

export default FormMinipack;
