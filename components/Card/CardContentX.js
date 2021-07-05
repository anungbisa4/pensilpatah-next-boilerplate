import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
const PriceFormat = dynamic(() => import("@/components/Filter/PriceFormat"));

const CardContentX = ({
  children,
  imgSrc,
  imgAlt,
  imgType,
  justifyCenter,
  justifyBetween,
  widthImage,
  heightImage,
  classImage,
  classImageDetail,
  containerClass,
  item,
  customDetail,
}) => {
  const [image, setImage] = useState({
    className: classImage || "w-90pt",
    width: widthImage || 120,
    height: heightImage || 120,
  });

  const [errImage, setErrImage] = useState(false);

  const onImage = () => setErrImage(true);

  return (
    <div
      className={`card-content-x items-center ${
        containerClass ? containerClass : "grid grid-flow-col"
      }`}
    >
      <div className={`${image.className}`}>
        <div
          className={`overflow-hidden rounded-xl bg-gray-200 ${
            classImageDetail ? classImageDetail : ""
          }`}
        >
          <Image
            src={
              errImage ? "/img/no-image.webp" : imgSrc || "/img/no-image.webp"
            }
            alt={imgAlt}
            width={image.width}
            height={image.height}
            layout="responsive"
            onError={onImage}
          />
        </div>
      </div>
      {justifyBetween && (
        <div className="flex flex-col pl-4 self-stretch flex-grow justify-between">
          <h2 className="content-name text-sm font-semibold leading-none line-clamp-2">
            {item?.PackageName}
          </h2>
          <span className="content-detail text-xs">
            {item?.PackageDesc}
            {/* <strong className="text-blue-primary">+ 3 Bulan</strong> Free Live
            TV & VOD */}
          </span>
          <span className="content-price text-xs">
            <strong>ONLY</strong>
            <strong className="text-blue-primary block">
              {<PriceFormat value={item?.Price} />}
            </strong>
          </span>
        </div>
      )}
      {justifyCenter && (
        <div className="flex flex-col p-1 pl-4 justify-center">{children}</div>
      )}
      {customDetail && <>{children}</>}
    </div>
  );
};

CardContentX.propTypes = {
  imgType: PropTypes.string.isRequired,
};

export default React.memo(CardContentX);
