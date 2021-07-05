import dynamic from "next/dynamic";
import useUser from "@/utils/hooks/useUser";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setPrice, setProductCode } from "@/store/order/action";

const BuyProduct = dynamic(() =>
  import("@/components/pages/buy-confirmation/BuyProduct")
);
const Count = dynamic(() => import("@/components/Action/Count"));
const CardContentX = dynamic(() => import("@/components/Card/CardContentX"));

const ContentConfirmation = () => {
  // const { user } = useUser();
  const dispatch = useDispatch();
  const {
    product,
    count: { count },
  } = useSelector((state) => state);
  const [totalPrice, setTotalPrice] = useState(product?.detail_package?.Price);

  const router = useRouter();

  useEffect(() => {
    setTotalPrice(product?.detail_package?.Price * count);
  }, [count]);

  const onBuy = () => {
    dispatch(
      setPrice({
        totalPrice,
        quantity: count,
        detail_package: product?.detail_package,
      })
    );
    dispatch(setProductCode(product?.detail_package?.ProductId));
    // if(!user.isLoggedIn) {
    //   return router.push("/login");
    // }
    return router.push("/delivery");
  };

  return (
    <>
      <div className="content-confirmation bg-gray-100 rounded-t-2xl fixed overflow-x-hidden overflow-y-scroll h-full w-full pb-36 mb-10">
        <div className=" p-4 px-6">
          <CardContentX
            imgSrc={product?.detail_package?.ThumbnailImg || "/error.jpg"}
            imgAlt="test"
            imgType="square"
            justifyBetween
            item={product?.detail_package}
          />
          <div className="mt-4 flex justify-end">
            <Count />
          </div>
          <section className="detail-package mt-4">
            <h2 className="text-md font-semibold">Details: </h2>
            <div className="p-4 mt-2 bg-white rounded-md">
              <div className="">
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: product?.detail_package?.PackageDetail?.replace(
                      /\r\n/g,
                      "<br />"
                    ),
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <BuyProduct onBuy={() => onBuy()} value={totalPrice} />
    </>
  );
};

export default ContentConfirmation;
