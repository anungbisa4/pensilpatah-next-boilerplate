import { useState } from "react";
import { DebetIcon } from "@/components/Icons";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";


import { ProductCardService } from "@/components/pages/services"

const list = require("@/dummy/product-square.json");

export default function ServiceList() {
const router = useRouter();
  const [selectBox, setSelectBox] = useState("default");

  const handleLink = () => router.push("/auto-debet", "/auto-debet" , { shallow: true });
  return (
    <>
      <section className="p-6 space-y-5">
        <span className="flex justify-center w-full p-2 text-center text-sm border-1 rounded-full">
          beruangair@gmail.com
        </span>
        {list?.map((item, index) => {
          return <ProductCardService key={index} item={item} rightDetail />;
        })}
        <div className="w-full pt-3">
          <button className="button-blue-gradient text-sm" onClick={handleLink}>Link more Account</button>
        </div>
      </section>
    </>
  );
}
