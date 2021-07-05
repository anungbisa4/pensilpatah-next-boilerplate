import { useState } from "react"
import { DotsVerticalIcon, XIcon } from "@heroicons/react/outline";

const ShippingDialog = ({onClose}) => {
  // console.log(onClose)
  return (
    <>
      <div className="shipping-dialog absolute bottom-0 w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl">
        <button
          className="outline-remove"
          onClick={() => onClose()}
        >
          <XIcon className="text-gray-light-dark w-6" />
        </button>
        <div className="mt-2 text-sm font-semibold">
          <div className="divide-y-2 divide-gray-light-pink divide-solid">
            <div className="py-3 cursor-pointer">Set as default address</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingDialog