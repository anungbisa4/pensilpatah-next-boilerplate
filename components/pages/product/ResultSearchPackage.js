import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { slug } from "@/utils/filter";

import TimeIcon from "@/components/Icons/TimeIcon";
import {
  getSearchPackage,
  addSearchPackage,
  removeSearchPackage,
  removeSearchAllPackage,
  filterMenu,
} from "@/store/search/action";

const CardContentX = dynamic(() => import("@/components/Card/CardContentX"));
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));

const list_product = [
  { id: 42, name: "Xstreambox" },
  { id: 44, name: "HiSpeed" },
  { id: 46, name: "Satelite" },
];

const HistorySearchPackage = ({ ...props }) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const [menu, setMenu] = useState("all")
  const router = useRouter()
  const keyword = router?.query?.keyword;

  const clearAll = () => {
    dispatch(removeSearchAllPackage());
  };

  const clearItem = (q) => {
    dispatch(removeSearchPackage(q));
  };

  useEffect(() => {
    dispatch(filterMenu(0));
  }, [search?.search_package]);

  console.log(search?.search_package);

  const onChangeMenu = (value) => {
    setMenu(value.name);
    // dispatch(filterMenu(value.id));
    dispatch(getSearchPackage(router?.query?.keyword, value.id));
  }

  const onLink = (item) => {
    const title = slug(item.PackageName) || "trans";
    return router.push(`/product/${item.ProductId}/package/${item.PackageId}/${title}`)
  }
  

  return (
    <>
      <section className="text-xs px-2 mt-7">
        {keyword && (
          <div className="overflow-x-auto scrollbar-none flex space-x-4 items-center">
            <div className="">
              <button
                onClick={() => onChangeMenu({ id: 0, name: keyword })}
                className={`button-blue-primary border-blue-primary px-12 
                ${
                  menu === "all"
                    ? "bg-white border-2 gradient-blue"
                    : "bg-transparent border-2 text-blue-primary focus:bg-transparent focus:text-blue active:opacity-100 active-blue"
                }
                `}
              >
                All
              </button>
            </div>
            {list_product.map((item, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() => onChangeMenu(item)}
                    className={`button-blue-primary border-blue-primary px-6 
                ${
                  menu === item.name
                    ? "bg-white border-2 gradient-blue"
                    : "bg-transparent border-2 text-blue-primary focus:bg-transparent focus:text-blue active:opacity-100 active-blue"
                }
                `}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="result-package mb-6">
          {search?.filter_package?.length > 0 && (
            <h1 className="uppercase font-semibold text-gray-sidebar my-6">
              {menu}
            </h1>
          )}

          <div className="space-y-4">
            {search?.filter_package?.length === 0 && (
              <div className="w-full text-center text-blue-primary p-10">Your search is not found :(</div>
            )}
            {search?.filter_package?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center cursor-pointer active:opacity-70"
                  onClick={() => onLink(item)}
                >
                  <CardContentX
                    justifyCenter
                    imgSrc={item.ThumbnailImg}
                    imgAlt="test"
                    imgType="square"
                    widthImage={60}
                    heightImage={60}
                    classImage="w-60pt"
                  >
                    <div>
                      <h2 className="font-semibold">{item.PackageName}</h2>
                      <h2 className="font-semibold text-blue-primary mt-1">
                        <PriceFormat value={item.Price} />
                      </h2>
                    </div>
                  </CardContentX>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HistorySearchPackage;
