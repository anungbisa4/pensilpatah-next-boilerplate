import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic'
import _clamp from "lodash/clamp"
import { useRouter } from "next/router"
import { animated, useSpring, config } from "react-spring";
import { useDrag, useGesture } from "react-use-gesture";
import { useSelector, useDispatch } from "react-redux"
import { slug } from "@/utils/filter";
import { clearOrder } from "@/store/order/action";
import { clearCount } from "@/store/count/action";
import {
  motion,
  // useDragControls,
  useAnimation,
  // AnimateSharedLayout,
} from "framer-motion";

const Dropdown = dynamic(() => import('@/components/Form/Dropdown'))
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));
const SectionBanner = dynamic(() => import("@/components/Banner/SectionBanner"));
  // const variants = {
  //   visible: { y: 0 },
  //   hidden: { y: "70%" },
  // };
const DetailCard = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { product, ...store } = useSelector(state => state)
  const controls = useAnimation();
  const [downSwipe, setDownSwipe] = useState(true)
  // const [translate, setTranslate] = useState(true)

  function onDragEnd(event, info) {
    // setTranslate(false);
    const shouldClose = info.velocity.y < 20 || (info.velocity.y >= 0 && info.point.y < 45);
    if (shouldClose) {
      controls.start("visible");
      setDownSwipe(false)
    } else {
      controls.start("hidden");
      setDownSwipe(true);
    }
  }
  useEffect(() => {
    // setTranslate(true)
    controls.start("hidden");
    return () => {
      controls.stop();
    }
  }, [])
  const onBuy = () => {
    dispatch(clearCount());
    const packageName = slug(product?.detail_package?.PackageName);
    // console.log(store);
    router.push(`/buy-confirmation/${product?.detail_package?.PackageId}/${packageName}`);
  }
  return (
    <>
      <div className={`relative ${downSwipe ? "" : "z-75"}`}>
        <motion.div
          className={`detail-card-wrapper bg-gray-light w-full rounded-t-2xl shadow-up pt-12 h-screen`}
          drag="y"
          dragTransition={{ min: 0, max: 500, bounceDamping: 20 }}
          transition={{
            y: { type: "spring", stiffness: 400, damping: 50 },
          }}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { y: 0 },
            hidden: { y: 500 },
          }}
          onDragEnd={onDragEnd}
          dragDirectionLock
          dragConstraints={{
            top: 0,
          }}
          dragElastic={0.2}
        >
          <div className="absolute w-full top-0">
            <span className="mx-auto block w-53 h-1.5 bg-gray-light-dark rounded-full mt-2" />
          </div>
          <div
            className={`flex flex-col h-full w-full ${
              downSwipe ? "" : "overflow-scroll"
            }`}
          >
            <div>
              <div className=" px-6">
                <h1 className="text-xl font-black pb-4">
                  {product?.detail_package?.PackageName}
                </h1>
                {/* <p className="text-sm">
                  {product?.detail_package?.PackageDesc}
                </p> */}
                <div className="">
                  <p
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                      __html: product?.detail_package?.PackageDetail.replace(
                        /\r\n/g,
                        "<br />"
                      ),
                    }}
                  />
                </div>
              </div>
              <div
                id="action-buy"
                className=" px-6 w-full mb-8 relative z-50 mt-8"
              >
                <div
                  id="buy-now"
                  className="flex items-center justify-between border-2 overflow-hidden w-full h-12 bg-white rounded-full text-white mb-4"
                >
                  <div className="font-semibold px-2 text-lg flex-grow text-blue-primary text-center">
                    <PriceFormat value={product?.detail_package?.Price} />
                  </div>
                  <button
                    onClick={onBuy}
                    type="button"
                    className="h-full text-sm px-8 bg-gradient-to-r from-blue-primary to-blue-dark-sky border-0 active:opacity-70 focus:outline-none"
                  >
                    BUY NOW
                  </button>
                </div>
                <Dropdown
                  items={product?.detail_product?.data?.result?.Channels}
                />
              </div>
              <span
                id="defider"
                className="block w-full h-1pt rounded-full bg-gray-200"
              />
              <section className="mt-8 relative">
                <SectionBanner
                  title="Packages"
                  horizontalCardBanner
                  noSpace
                  banner={product?.detail_product?.data?.result?.Packages}
                />
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default DetailCard