import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const CardImageHorizontal = dynamic(() =>
  import("@/components/Card/CardImageHorizontal")
);

const bannerArticle = require("@/dummy/article-hor.json");

const RelatedArticle = ({ ...props }) => {
  return (
    <>
      <div className="related-article ">
        <h5 className="text-sm font-bold mt-8">More Articles</h5>
        <div className="py-8 grid grid-flow-row grid-cols-2 gap-4">
          {bannerArticle.map((item, index) => {
            return (
              <div key={index} className="active:opacity-70">
                <Link
                  href={`/article/${item.id_article}/${item.title}?image_src=${item.image}`}
                >
                  <a>
                    <CardImageHorizontal
                      src={item.image}
                      alt="image banner"
                      widthImg={149}
                      heightImg={97}
                      title={item.title}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RelatedArticle;
