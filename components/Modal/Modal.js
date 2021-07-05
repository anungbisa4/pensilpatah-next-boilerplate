import React, {
  useState,
  useCallback,
  Fragment,
  useEffect,
  useRef,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "@/store/modal/action";

const Modal = ({ children, open, toggle, bottom, fadeAnimation }) => {
  // export function Modal() {
  const buttonInit = useRef();

  const transition = bottom
    ? {
        enter: "ease-out duration-500",
        enterFrom: "translate-y-3",
        enterTo: "translate-y-0",
        leave: "ease-out duration-500",
        leaveFrom: "translate-y-0",
        leaveTo: "translate-y-full",
      }
    : fadeAnimation
    ? ""
    : {
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
      };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-9999 overflow-y-auto"
        initialFocus={buttonInit}
        static
        open={open}
        onClose={toggle}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="overlay fixed inset-0 bg-gray-500 bg-opacity-60" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className={`inline-block h-screen align-middle`}
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child as={Fragment} {...transition}>
            {children}
          </Transition.Child>
          <button ref={buttonInit} />
        </div>
      </Dialog>
    </Transition>
  );
};

export default React.memo(Modal);
