import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { XIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"

import TimeIcon from "@/components/Icons/TimeIcon";
import {
  addSearchPackage,
  removeSearchPackage,
  removeSearchAllPackage,
} from "@/store/search/action";

const HistorySearchPackage = ({...props}) => {
  const dispatch = useDispatch()
  const { search } = useSelector(state => state)
  const router = useRouter()

  const clearAll = () => {
    dispatch(removeSearchAllPackage())
  }

  const clearItem = (q) => {
    dispatch(removeSearchPackage(q))
  }

  const onSearch = (value) => {
    router.replace(
      `/search/package?keyword=${value}`,
      `/search/package?keyword=${value}`,
      { shallow: true }
    );
  }
  

  return (
    <>
      <section className="text-xs">
        <div className="history-search-package flex justify-between mb-5 px-2">
          <h2 className="text-gray-sidebar font-semibold">RECENT SEARCHES</h2>
          <button
            className="outline-remove active:opacity-70 text-blue-primary"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>
        {search?.history_search?.map((item, index) => {
          return (
            <div
              onClick={() => onSearch(item)}
              key={index}
              className="transition-all ease-in space-y-2 p-2 active:bg-gray-hover hover:bg-gray-hover rounded-lg cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TimeIcon className="w-4 h-4 text-gray-warm mr-3" />
                  <h2 className="font-semibold text-gray-warm">{item}</h2>
                </div>
                <button
                  className="outline-remove active:opacity-70"
                  onClick={() => clearItem(item)}
                >
                  <XIcon className="w-4 h-4 text-gray-warm" />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default HistorySearchPackage