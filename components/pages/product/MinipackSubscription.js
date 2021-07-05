import { useState, useEffect } from "react";
import { SwitchOrderMinipack, FormMinipack } from "./index";
import { apiDetailProduct } from "@/utils/apiHandlers";
import { useDispatch } from "react-redux";
import { getMinipackProduct } from "@/store/product/action";
import { loadingScreen } from "@/store/loader/action";

import MainBanner from "@/components/Banner/MainBanner";

const MinipackSubscription = ({ router }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let unmounted = false;

    getDetailMinipack(121);

    async function getDetailMinipack(id) {
      dispatch(loadingScreen(true));
      try {
        const response = await apiDetailProduct(id);
        if (response.status === 200) {
          dispatch(loadingScreen(false));
          dispatch(getMinipackProduct(response?.data?.result?.Packages));
        }
      } catch (err) {
        dispatch(loadingScreen(false));
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <>
      <div className="mx-auto w-[225px] p-6">
        <MainBanner
          src="/img/logoMinipack.png"
          width={278}
          height={89}
          alt="minipack subscription"
          bgTransparent
          unoptimized
        />
      </div>
      <main className="max-w-2xl mx-auto">
        <SwitchOrderMinipack />
        <FormMinipack />
      </main>
    </>
  );
};

export default MinipackSubscription;
