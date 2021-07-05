import { useState } from "react";
import { useRouter } from "next/router"

export default function AutoDebetAction() {
  const router = useRouter()

  const handleLink = () =>
    router.push("/services?list=xstream", "/services?list=xstream", { shallow: true });

  return (
    <>
      <div className="auto_debet-action fixed flex w-full bg-white z-75 bottom-0 shadow-up px-6 justify-end space-x-3 py-4">
        <button className="text-sm font-semibold active:opacity-70 text-blue-primary outline-remove">
          Delete
        </button>
        <div>
          <button
            className="button-blue-primary px-4 text-sm"
            onClick={handleLink}
          >
            Save Auto Debet
          </button>
        </div>
      </div>
    </>
  );
}
