import { useState } from "react";
import { InfoCircleOutlineIcon } from "@/components/Icons";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// loader
import ScreenLoader from "@/components/Loader/ScreenLoader";

import dynamic from "next/dynamic";
import MainBanner from "@/components/Banner/MainBanner";
import InputSearch from "@/components/Form/InputSearch";
import ListBox from "@/components/Form/ListBox";

const ServiceList = dynamic(
  () => import("@/components/pages/services").then((mod) => mod.ServiceList),
  { loading: () => <ScreenLoader /> }
);

const box = [
  { name: "Xstream Box" },
  { name: "Hi-Speed" },
  { name: "Satelite TV" },
  { name: "Nusantara" },
  { name: "Dealership" },
];

export default function MyServices() {
  const router = useRouter();
  const [selectBox, setSelectBox] = useState("default");

  console.log(router);

  const onConnect = () =>
    router.push("/data-verification", "/data-verification", { shallow: true });

  const ConnectService = () => (
    <section className="px-6 pb-6">
      <h1 className="mt-10 text-lg font-bold text-center">
        Connect Your Account
      </h1>
      <p className="text-center text-sm py-4">
        Connect your Customer ID to enjoy all Transvision products
      </p>
      <div className="mx-auto w-[225px] pt-4">
        <MainBanner
          src="/img/servicePeople.webp"
          width={225}
          height={225}
          bgTransparent
        />
      </div>
      <div className="pt-10 space-y-6">
        <div className="flex justify-between items-center">
          <ListBox
            label="Xstream Box"
            selected={selectBox}
            setSelected={setSelectBox}
            list={box}
            defaultItemClass="rounded-full py-3 border-1 border-gray-300 bg-white bg-opacity-40"
            textDefaultClass="text-xs"
            suffixClass="pr-[16px]"
            listItemClass="max-h-40 border-1 border-gray-300"
          />
        </div>
        <div className="mx-auto w-full">
          <InputSearch
            placeholder="Your ID"
            suffix={<InfoCircleOutlineIcon className="w-5 text-gray-a1a1" />}
            onClick={() => {}}
            className="w-full placeholder-black bg-white bg-opacity-40 text-xs text-center border-1 border-gray-300"
          />
        </div>
        <div className="mx-auto w-[154px]">
          <button
            type="button"
            onClick={onConnect}
            className="button-blue-gradient text-sm"
          >
            Connect
          </button>
        </div>
      </div>
    </section>
  );
  return (
    <>
      {router?.query?.list === "xstream" ? <ServiceList /> : <ConnectService />}
    </>
  );
}
