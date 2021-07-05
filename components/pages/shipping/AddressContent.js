import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

import { PlusIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "@/store/modal/action";
import { useRouter } from "next/router";

const AddressCard = dynamic(() =>
  import("@/components/pages/shipping/AddressCard")
);
const AddressContent = ({ ...props }) => {
  const [address, setAddress] = useState(false);
  const router = useRouter()
  const { user, shipping } = useSelector((state) => state);
  // const dispatch = useDispatch()


  return (
    <>
      <div className="address-content bg-gray-100 pb-16 mb-10 fixed overflow-x-hidden overflow-y-scroll h-full w-full">
        {/* <PlusIcon className="w-10" /> */}
        <div className="space-y-2">
          {shipping?.data_address?.map((item, index) => (
            <AddressCard key={index} active={item.active} item={item} />
          ))}
        </div>
      </div>
      <div
        onClick={() =>
          router.push("/address/[name]", "/address/create", {
            shallow: true,
          })
        }
        className="fixed p-2 gradient-blue right-8 bottom-8 rounded-full shadow-blue z-10"
      >
        <PlusIcon className="w-10 text-white cursor-pointer" />
      </div>
    </>
  );
};
export default React.memo(AddressContent);


// import React, { useCallback } from "react";
// import { useDispatch } from "react-redux";

// const CounterComponent = ({ value }) => {
//   const dispatch = useDispatch();
//   const incrementCounter = useCallback(
//     () => dispatch({ type: "increment-counter" }),
//     []
//   );
//     console.log("value")
//   return (
//     <div>
//       <span>{value}</span>
//       <MyIncrementButton onIncrement={incrementCounter} />
//     </div>
//   );
// };

// export const MyIncrementButton = React.memo(({ onIncrement }) => {
//   console.log("test increment")
//   return <button onClick={onIncrement}>Increment counter</button>;
// });

// export default CounterComponent
