import { Dialog } from "@headlessui/react"
import { useRef } from "react"

function ModalV2({ open, toggle, children }) {
  let buttonRef = useRef(null)
  return (
    <Dialog
      open={open}
      onClose={toggle}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" /> */}
      <div className="flex items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        {children}
      </div>
      <button ref={buttonRef} />
    </Dialog>
  );
}

export default ModalV2