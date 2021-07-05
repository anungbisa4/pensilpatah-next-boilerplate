import { useState, useEffect } from "react";
import dynamic from "next/dynamic"
import { useDispatch, useSelector } from "react-redux"
import { DotsVerticalIcon, XIcon } from "@heroicons/react/outline"
import { changeAddress } from "@/store/shipping/action";
import { apiRemoveAddress, apiNewAddress } from "@/utils/apiHandlers";
import { deleteAddress, setMainAddress } from "@/store/shipping/action";
import { useRouter } from "next/router";

const Label = dynamic(() => import("@/components/Label/Label"));
const CheckIcon = dynamic(() => import("@/components/Icons/CheckIcon"));
const TrashIcon = dynamic(() => import("@/components/Icons/TrashIcon"));
const Modal = dynamic(() => import("@/components/Modal/Modal"));
const CheckBox = dynamic(() => import("@/components/Form/Checkbox"));

const AddressCard = ({active, label, item}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('edit')
  const { user } = useSelector(state => state)
  const dispatch = useDispatch();

  const bodyType = (type) => {
    switch (type) {
      case "edit":
        return editBody;
      case "delete-question":
        return deleteBody;
      case "success-delete":
        return successDeleteBody;
      case "success-add":
        return successAddBody;
      default:
        return editBody;
    }
  }

  

  const onOpen = (type, item = null) => {
    setType(type)
    if (["delete-question", "success-delete", "success-add"].includes(type)) {
      return setIsOpen(true);
    } 
    setIsOpen(!isOpen);
  }

  const onChangeAddress = () => {
    setIsOpen(!isOpen);
    dispatch(changeAddress(item))
    router.push("/address/[name]", "/address/edit");
  }

  const onDeleteItem = () => {
    const email = user?.customerInfo?.email || user?.userInfo?.responseData?.email
    const id_address = [item?.customer_address_id];
    apiRemoveAddress(email, id_address).then(() => {
      dispatch(deleteAddress(item));
      onOpen("success-delete");
    });
  };

  const onDefaultAddress = (main) => {
    const email = user?.customerInfo?.email || user?.userInfo?.responseData?.email
    const response = apiNewAddress(
      email,
      item.customer_address_id,
      item.customer_address,
      item.customer_subdistrict,
      item.customer_district,
      item.customer_city,
      item.customer_province,
      item.customer_zipcode,
      item.customer_street,
      item.address_category,
      "1",
      item.receiver_fullname,
      item.receiver_phone_number
    )
    if(!main) {
      response.then(() => {
        onOpen("success-add");
        dispatch(setMainAddress(item));
      });
    } else {
      dispatch(setMainAddress(item));
      onDefault()
    }
  }

  const onDefault = () => {
    // setIsOpen(!isOpen);
    // router.push("/delivery", "/delivery", { shallow: true });
    if(router.asPath.includes("/all-address/shipping")) {
      router.push("/delivery", "/delivery", { shallow: true });
    }
    if(router.asPath.includes("/all-address/user")) {
      router.push("/profile", "/profile");
    }
  }


  const editBody = () => (
    <div className="absolute bottom-0 w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl">
      <button className="outline-remove" onClick={() => setIsOpen(!isOpen)}>
        <XIcon className="text-gray-light-dark w-6" />
      </button>
      <div className="mt-2 text-sm font-semibold">
        <div className="divide-y-2 divide-gray-light-pink divide-solid">
          <div onClick={() => onDefaultAddress(null)} className="py-3 cursor-pointer">
            Set as default address
          </div>
          <div onClick={onChangeAddress} className="py-3 cursor-pointer">
            Change address
          </div>
          <div
            onClick={() => onOpen("delete-question")}
            className="py-3 cursor-pointer"
          >
            Delete address
          </div>
        </div>
      </div>
    </div>
  );

  const deleteBody = () => (
    <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transform py-9">
      <div className="mx-4 p-4 shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col">
          <div className="flex items-center">
            <TrashIcon className="w-6 text-blue-primary mr-2" />
            <label className="font-semibold">Delete</label>
          </div>
          <h3 className="font-semibold text-sm my-6">
            Are you sure want to delete{" "}
            <span className="block">this address?</span>
          </h3>
          <div className="flex self-end">
            <div className="w-28">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex mx-auto font-semibold items-center justify-center w-full  py-2 outline-remove rounded-full"
              >
                Cancel
              </button>
            </div>
            <div className="w-28">
              <button
                onClick={onDeleteItem}
                className="flex mx-auto text-white font-semibold items-center justify-center gradient-blue border-2 w-full  py-2 outline-remove rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const successDeleteBody = () => (
    <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transform py-9">
      <div className="mx-4 p-4 py-8 shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col justify-center items-center">
          <div>
            <CheckIcon className="w-32" />
          </div>
          <h3 className="font-semibold text-xl text-blue-primary my-6">
            Address Successfully{" "}
            <span className="block text-center">Deleted!</span>
          </h3>
            <div className="w-44">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex mx-auto text-white font-semibold items-center justify-center gradient-blue border-2 w-full  py-2 outline-remove rounded-full"
              >
                OK
              </button>
            </div>
        </div>
      </div>
    </div>
  );

  const successAddBody = () => (
    <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transform py-9">
      <div className="mx-4 p-4 py-8 shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col justify-center items-center">
          <div>
            <CheckIcon className="w-32" />
          </div>
          <h3 className="font-semibold text-xl text-blue-primary my-6">
            Address Successfully{" "}
            <span className="block text-center">Set as Default!</span>
          </h3>
            <div className="w-44">
              <button
                onClick={onDefault}
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
      <div className="address-card relative bg-white shadow-sm">
        <div className=" flex items-center p-4 text-xs sm:text-sm font-semibold">
          {/* <div>
            <CheckBox />
          </div> */}
          <div onClick={() => onDefaultAddress("main")}>
            <div className="flex items-center">
              <h2 className="mr-4">{item.receiver_fullname}</h2>
              <Label
                className="p-2 py-1 text-xs font-semibold rounded-md mr-2"
                type="basic"
                title={item.address_category}
              />
              {item.main_address === "1" && <CheckIcon className="w-5" />}
            </div>
            <p className="font-medium">{item.receiver_phone_number}</p>
            <p className="font-normal">
              {item.customer_address},{" "}{item.customer_street},{" "}
              {item.customer_subdistrict},{" "}{item.customer_district},{" "}
              {item.customer_city},{" "}{item.customer_province},{" "}
              {item.customer_zipcode}
            </p>
          </div>
        </div>
        <button className="absolute top-4 right-4 outline-remove z-10" onClick={() => onOpen("edit", item)}>
          <DotsVerticalIcon className="w-6 text-gray-bluey" />
        </button>
      </div>
      <Modal open={isOpen} toggle={() => setIsOpen(!isOpen)} bottom>
        {bodyType(type)}
      </Modal>
    </>
  );
}

export default AddressCard