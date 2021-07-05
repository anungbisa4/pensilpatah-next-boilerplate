import { useState } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import { EyeIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic"
import Link from "next/link"

const CardContentX = dynamic(() => import("@/components/Card/CardContentX"));

const CardArticleHorizontal = ({ item }) => {
  return (
    <>
      <Link
        href={`/article/${item.id_article}/${item.title}?image_src=${item.image}`}
      >
        <section className="card-article-horizontal">
          <CardContentX
            imgSrc={item.image || "/img/no-image.webp"}
            imgAlt="test"
            imgType="horizontal"
            widthImage={125}
            heightImage={86}
            classImage="w-36"
            justifyCenter
          >
            <h2 className="content-name text-sm font-semibold w-full line-clamp-3 leading-5">
              {item.title}
            </h2>
            <div className="flex pt-2 text-xs text-gray-powder flex-wrap">
              <span className="flex items-center">
                <TimeIcon className="w-4 h-4 text-gray-powder" />
                <label className="px-2 truncate font-medium">28 Feb 2021</label>
              </span>
              <span className="flex items-center">
                <EyeIcon className="w-4 h-4 text-gray-powder" />
                <label className="pl-2 truncate font-medium">234 views</label>
              </span>
            </div>
          </CardContentX>
        </section>
      </Link>
    </>
  );
};

export default CardArticleHorizontal;
