import { useState, useContext } from "react";
import { MinipackContext } from "@/utils/contexts/minipackContext";
import { SwitchButton } from "@/components/Button";

const SwitchOrderMinipack = () => {
  const { switchOrder, setSwitchOrder } = useContext(MinipackContext);

  return (
    <>
      <SwitchButton
        switchButton={switchOrder}
        setSwitchButton={setSwitchOrder}
        textLeft="Order for Myself"
        textRight="Order for Others"
      />
    </>
  );
};

export default SwitchOrderMinipack;
