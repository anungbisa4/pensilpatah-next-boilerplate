import { useState, useEffect } from "react";
import { Modal } from "@/components/Modal";
import { XIcon } from "@heroicons/react/outline";
import MainBanner from "@/components/Banner/MainBanner";

const MinipackDetailModal = ({ open, toggle, detailPackage }) => {
  console.log(detailPackage);
  return (
    <>
      <Modal open={open} toggle={toggle}>
        <div className="wrapper-modal-middle">
          <div className="w-full max-w-md mx-auto bg-white rounded-xl h-[400px] flex flex-col overflow-hidden">
            <div className="image-detail-minipack h-[210px] relative overflow-hidden">
              <MainBanner
                src="/dummy-img/minipack-detail.jpg"
                width={327}
                height={210}
                className="overflow-hidden"
                // layout="intrinsic"
                bgTransparent
              />
              <button
                onClick={() => toggle()}
                className="outline-remove absolute top-4 right-4"
              >
                <XIcon className="w-6 text-gray-800 p-1 rounded-full bg-white" />
              </button>
            </div>
            <div className="h-1/2 my-4 px-8 space-y-4 overflow-y-auto scrollbar-none">
              <h1 className="text-left font-semibold text-xl">
                Minipack Blockbuster
              </h1>
              <p className="text-left text-xs font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi diam
                semper nisl auctor amet aliquam urna, laoreet. Gravida semper
                dolor metus gravida ut at maecenas id ac. Pulvinar in est, eget
                sollicitudin nec sed velit in vitae.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
``;

export default MinipackDetailModal;
