import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router"
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  getCity,
  getDistrict,
  getSubDistrict,
  getZipCode,
  getAllAddress
} from "@/store/address/action";
import { resetChangeAddress } from "@/store/shipping/action";
import { onlyTypeNumber } from "@/utils/filter";
import { apiNewAddress } from "@/utils/apiHandlers";

import dynamic from "next/dynamic";
import InputField from "@/components/Form/InputField";
import RadioGroupBasic from "@/components/Form/RadioGroupBasic";
import AccordionBasic from "@/components/Accordion/AccordionBasic";
import Toggle from "@/components/Form/Toggle";
import useFetch from "@/utils/hooks/useFetch";

const CircleRefreshIcon = dynamic(() => import("@/components/Icons/CircleRefreshIcon"));
const CheckIcon = dynamic(() => import("@/components/Icons/CheckIcon"));
const Modal = dynamic(() => import("@/components/Modal/Modal"));
const ListBox = dynamic(() => import("@/components/Form/ListBox"));
// const InputField = dynamic(() => import("@/components/Form/InputField"));
// const RadioGroupBasic = dynamic(() =>
//   import("@/components/Form/RadioGroupBasic")
// );
// const AccordionBasic = dynamic(() =>
//   import("@/components/Accordion/AccordionBasic")
// );
// const Toggle = dynamic(() => import("@/components/Form/Toggle"));

const plans = [
  "Home",
  "Office",
  "Other"
];
 const AddressSchema = Yup.object().shape({
   fullname: Yup.string().required("Required"),
   mobileNumber: Yup.string().required("Required"),
   detailAddress: Yup.string().required("Required"),
   province: Yup.string().required("Required"),
   city: Yup.string().required("Required"),
   district: Yup.string().required("Required"),
   subDistrict: Yup.string().required("Required"),
   zipCode: Yup.string().required("Required"),
   street: Yup.string().required("Required"),
 });
const NewAddressContent = ({ ...props }) => {
  const [mark, setMark] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState(null)
  const { address, user, shipping } = useSelector((state) => state);
  const dispatch = useDispatch()
  const router = useRouter()

  const [expanded, setExpanded] = useState(-1);
  const [mainAddress, setMainAddress] = useState(shipping?.change_address?.main_address === "1" || 0);
  const [province, setProvince] = useState(shipping?.change_address?.customer_province || "");
  const [city, setCity] = useState(shipping?.change_address?.customer_city || "");
  const [district, setDistrict] = useState(shipping?.change_address?.customer_district || "");
  const [subDistrict, setSubDistrict] = useState(shipping?.change_address?.customer_subdistrict || "");
  const [zipCode, setZipCode] = useState(shipping?.change_address?.customer_zipcode || "");

  let profile = null;
  if (user?.userChecker?.isLoggedIn) {
    profile = useFetch("/transvisionplus/ctc/allo/member/profile", {
      method: "GET",
      params: { phoneNo: user?.userChecker?.phoneNo },
    });
  }

  const onOption = (value, set, expand = -1, getData, defaultValue) => {
    eval(set)(value);
    setExpanded(expand)
    if(getData) {
      dispatch(getData)
    }
    if (Array.isArray(defaultValue)) {
      for (const setDefault of defaultValue) {
        eval(setDefault)("");
      }
    }
  };

  useEffect(() => {
    if(router.asPath === "/address/edit") {
      dispatch(getAllAddress(province, city, district, subDistrict));
      if(!shipping?.change_address?.receiver_fullname) {
        router.back()
      }
    } else {
      dispatch(resetChangeAddress());
    }
  }, [])

  const onSaveAddress = (values) => {
    apiNewAddress(
      values.emailCustomer,
      values.customer_address_id,
      values.detailAddress,
      values.subDistrict,
      values.district,
      values.city,
      values.province,
      values.zipCode,
      values.street,
      values.categoryAddress,
      values.mainAddress,
      values.fullname,
      values.mobileNumber
    ).then((res) => {
      setMsg(null);
      setIsOpen(!isOpen);
    })
    .catch((err) => {
      setIsOpen(!isOpen);
      setMsg(err?.err?.response?.data?.message[0]);
    })
  }

  const successAddBody = () => (
    <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transform py-9">
      <div className="mx-4 p-4 py-8 shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col justify-center items-center">
          <div>
            <CheckIcon className="w-32" />
          </div>
          <h3 className="font-semibold text-xl text-blue-primary my-6">
            Address Successfully{" "}
            <span className="block text-center">Added!</span>
          </h3>
          <div className="w-44">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                router.back();
              }}
              className="flex mx-auto text-white font-semibold items-center justify-center gradient-blue border-2 w-full  py-2 outline-remove rounded-full"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const errorMsg = () => (
    <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transform py-9">
      <div className="mx-4 p-4 py-8 shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-semibold text-base text-center my-6">
            {msg}
          </h3>
          <div className="w-44">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="flex mx-auto text-white font-semibold items-center justify-center gradient-blue border-2 w-full  py-2 outline-remove rounded-full"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="new-address-content bg-white pb-16 mb-10 fixed overflow-x-hidden overflow-y-scroll h-full w-full">
        <Formik
          className="mt-12"
          initialValues={{
            fullname: shipping?.change_address?.receiver_fullname || "",
            mobileNumber: shipping?.change_address?.receiver_phone_number || "",
            detailAddress: shipping?.change_address?.customer_address || "",
            province: province,
            city: city,
            district: district,
            subDistrict: subDistrict,
            zipCode: zipCode,
            street: shipping?.change_address?.customer_street || "",
            mainAddress: mark,
            customer_address_id: shipping?.change_address?.customer_address_id || "0",
            categoryAddress: mark,
            emailCustomer: profile?.response?.result?.responseData?.email,
          }}
          validationSchema={AddressSchema}
          onSubmit={onSaveAddress}
        >
          {(props) => {
            props.values.province = province;
            props.values.city = city;
            props.values.district = district;
            props.values.subDistrict = subDistrict;
            props.values.zipCode = zipCode;
            props.values.categoryAddress = mark;
            props.values.mainAddress = mainAddress ? "1" : "0";
            props.values.emailCustomer = profile?.response?.result?.responseData?.email;
            return (
              <Form className="relative">
                {/* <Field id="firstName" name="firstName" placeholder="Jane" /> */}
                <div className="divide-y-2 border-b-8 border-gray-100 px-4">
                  <InputField
                    withoutValidation
                    name="fullname"
                    placeholder="Fullname"
                    className={`input-basic`}
                  />
                  <InputField
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    className={`input-basic`}
                  />
                </div>
                <div>
                  <AccordionBasic
                    i="province"
                    title={province === "" ? "Province" : province}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    className="bg-white px-4"
                    classTitle={`truncate w-full text-sm py-4 border-b-2 ${
                      province === "" ? "text-gray-400" : ""
                    }`}
                    typeIcon="chevron"
                  >
                    <div className="w-full p-2 overflow-auto text-sm bg-white border-1 rounded-xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {address?.province?.map((item, index) => {
                        return (
                          <button
                            key={index}
                            onClick={() =>
                              onOption(
                                item,
                                "setProvince",
                                "city",
                                getCity(item),
                                [
                                  "setCity",
                                  "setDistrict",
                                  "setSubDistrict",
                                  "setZipCode",
                                ]
                              )
                            }
                            className="text-amber-900 bg-amber-100 cursor-default select-none relative px-6 outline-remove block w-full"
                          >
                            <span
                              className={`text-center py-2 block truncate active:opacity-70 text-gray-warm ${
                                province !== item
                                  ? ""
                                  : "font-medium text-blue-primary bg-gray-100"
                              }`}
                            >
                              {item}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </AccordionBasic>
                </div>
                <div>
                  <AccordionBasic
                    i="city"
                    title={city === "" ? "City" : city}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    className="bg-white px-4"
                    classTitle={`truncate w-full text-sm py-4 border-b-2 ${
                      city === "" ? "text-gray-400" : ""
                    }`}
                    typeIcon="chevron"
                  >
                    <div className="w-full p-2 overflow-auto text-sm bg-white border-1 rounded-xl h-60 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {!address?.loading_city && address?.city ? (
                        address?.city?.map((item, index) => {
                          return (
                            <button
                              key={index}
                              onClick={() =>
                                onOption(
                                  item,
                                  "setCity",
                                  "district",
                                  getDistrict(province, item),
                                  [
                                    "setDistrict",
                                    "setSubDistrict",
                                    "setZipCode",
                                  ]
                                )
                              }
                              className="text-amber-900 bg-amber-100 cursor-default select-none relative px-6 outline-remove block w-full"
                            >
                              <span
                                className={`text-center py-2 block truncate active:opacity-70 text-gray-warm ${
                                  city !== item
                                    ? ""
                                    : "font-medium text-blue-primary bg-gray-100"
                                }`}
                              >
                                {item}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="w-full h-full grid grid-flow-row">
                          {address?.loading_city && (
                            <CircleRefreshIcon className="animate-spin h-5 w-5 mr-3 text-blue-500 place-self-center" />
                          )}
                          {!address?.city && !address?.loading_city && (
                            <span className="place-self-center text-sm">
                              Data Tidak Tersedia
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </AccordionBasic>
                </div>
                <div>
                  <AccordionBasic
                    i="district"
                    title={district === "" ? "District" : district}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    className="bg-white px-4"
                    classTitle={`truncate w-full text-sm py-4 border-b-2 ${
                      district === "" ? "text-gray-400" : ""
                    }`}
                    typeIcon="chevron"
                  >
                    <div className="w-full p-2 overflow-auto text-sm bg-white border-1 rounded-xl h-60 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {!address?.loading_district &&
                      address?.district?.length > 0 ? (
                        address?.district?.map((item, index) => {
                          return (
                            <button
                              key={index}
                              onClick={() =>
                                onOption(
                                  item,
                                  "setDistrict",
                                  "subDistrict",
                                  getSubDistrict(province, city, item),
                                  ["setSubDistrict", "setZipCode"]
                                )
                              }
                              className="text-amber-900 bg-amber-100 cursor-default select-none relative px-6 outline-remove block w-full"
                            >
                              <span
                                className={`text-center py-2 block truncate active:opacity-70 text-gray-warm ${
                                  district !== item
                                    ? ""
                                    : "font-medium text-blue-primary bg-gray-100"
                                }`}
                              >
                                {item}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="w-full h-full grid grid-flow-row">
                          {address?.loading_district ? (
                            <CircleRefreshIcon className="animate-spin h-5 w-5 mr-3 text-blue-500 place-self-center" />
                          ) : (
                            <span className="place-self-center text-sm">
                              Data Tidak Tersedia
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </AccordionBasic>
                </div>
                <div>
                  <AccordionBasic
                    i="subDistrict"
                    title={subDistrict === "" ? "Sub District" : subDistrict}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    className="bg-white px-4"
                    classTitle={`truncate w-full text-sm py-4 border-b-2 ${
                      subDistrict === "" ? "text-gray-400" : ""
                    }`}
                    typeIcon="chevron"
                  >
                    <div className="w-full p-2 overflow-auto text-sm bg-white border-1 rounded-xl h-60 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {!address?.loading_sub_district &&
                      address?.sub_district?.length > 0 ? (
                        address?.sub_district?.map((item, index) => {
                          return (
                            <button
                              key={index}
                              onClick={() =>
                                onOption(
                                  item,
                                  "setSubDistrict",
                                  "zipCode",
                                  getZipCode(province, city, district, item),
                                  ["setZipCode"]
                                )
                              }
                              className="text-amber-900 bg-amber-100 cursor-default select-none relative px-6 outline-remove block w-full"
                            >
                              <span
                                className={`text-center py-2 block truncate active:opacity-70 text-gray-warm ${
                                  subDistrict !== item
                                    ? ""
                                    : "font-medium text-blue-primary bg-gray-100"
                                }`}
                              >
                                {item}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="w-full h-full grid grid-flow-row">
                          {address?.loading_sub_district ? (
                            <CircleRefreshIcon className="animate-spin h-5 w-5 mr-3 text-blue-500 place-self-center" />
                          ) : (
                            <span className="place-self-center text-sm">
                              Data Tidak Tersedia
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </AccordionBasic>
                </div>
                <div>
                  <AccordionBasic
                    i="zipCode"
                    title={zipCode === "" ? "Postal Code" : zipCode}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    className="bg-white px-4"
                    classTitle={`truncate w-full text-sm py-4 border-b-2 ${
                      zipCode === "" ? "text-gray-400" : ""
                    }`}
                    typeIcon="chevron"
                  >
                    <div className="w-full p-2 overflow-auto text-sm bg-white border-1 rounded-xl h-60 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {!address?.loading_zip_code &&
                      address?.zip_code?.length > 0 ? (
                        address?.zip_code?.map((item, index) => {
                          return (
                            <button
                              type="button"
                              key={index}
                              onClick={() => onOption(item, "setZipCode")}
                              className="text-amber-900 bg-amber-100 cursor-default select-none relative px-6 outline-remove block w-full"
                            >
                              <span
                                className={`text-center py-2 block truncate active:opacity-70 text-gray-warm ${
                                  city !== item
                                    ? ""
                                    : "font-medium text-blue-primary bg-gray-100"
                                }`}
                              >
                                {item}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="w-full h-full grid grid-flow-row">
                          {address?.loading_zip_code ? (
                            <CircleRefreshIcon className="animate-spin h-5 w-5 mr-3 text-blue-500 place-self-center" />
                          ) : (
                            <span className="place-self-center text-sm">
                              Data Tidak Tersedia
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </AccordionBasic>
                </div>
                <div className="divide-y-2 border-b-8 border-gray-100 px-4">
                  <div>
                    <InputField
                      withoutValidation
                      name="street"
                      placeholder="Street Name, Building, Number House/Unit"
                      className={`input-basic`}
                    />
                  </div>
                  <div>
                    <InputField
                      withoutValidation
                      name="detailAddress"
                      placeholder="Detail Add Address (Optional)"
                      className={`input-basic`}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm">Mark as: </label>
                    <div>
                      <RadioGroupBasic
                        value={mark}
                        setValue={setMark}
                        optionValue={plans}
                        groupClass="flex my-3 divide-x-8 divide-white"
                        optionClass="p-2 py-1 bg-gray-100 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <label className="text-gray-400 text-sm">
                      Set as primary address{" "}
                    </label>
                    <div>
                      <Toggle
                        enabled={mainAddress}
                        setEnabled={setMainAddress}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-40 mx-auto my-9">
                  <button
                    type="submit"
                    disabled={!props.isValid || !props.dirty}
                    className={`flex mx-auto text-white font-semibold items-center justify-center border-2 w-full  py-2 outline-remove rounded-full disabled:opacity-50 gradient-blue disable-gradient-blue`}
                  >
                    Save
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Modal
        open={isOpen}
        toggle={() => {
          setIsOpen(!isOpen);
          if (!msg) {
            router.push("/address", "/address", {
              shallow: true,
            });
          }
        }}
      >
        {msg ? errorMsg() : successAddBody()}
      </Modal>
    </>
  );
};
export default NewAddressContent;

    {
      /* <div className="flex justify-between items-center">
      <ListBox
        label="Province"
        selected={selectedProvince}
        setSelected={setSelectedProvince}
        list={province}
      />
    </div>
    <div className="flex justify-between items-center">
      <ListBox
        label="City"
        selected={city}
        setSelected={setCity}
        list={listCity}
      />
    </div>
    <div className="flex justify-between items-center">
      <ListBox
        label="District"
        selected={distric}
        setSelected={setDistric}
        list={listDistric}
      />
    </div>
    <div className="flex justify-between items-center">
      <ListBox
        label="Postal Code"
        selected={postalCode}
        setSelected={setPostalCode}
        list={listPostalcode}
      />
    </div> */
    }