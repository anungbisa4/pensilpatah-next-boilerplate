import { useState } from "react";
import line from "@/public/icons/line-envelope.svg";
import PropTypes from "prop-types"

// shipping address exist or no
// shipping service
// order summary
// shiping coupon

const ShippingCard = ({
  children,
  withBorderBottom,
  withAction,
  title,
  titleAction,
  addressActive,
  onChange,
  ...props
}) => {
  return (
    <>
      <div className="shipping-card w-full bg-white rounded-md shadow-md2 overflow-hidden relative">
        <header className="p-4 text-sm sm:text-base flex justify-between items-center border-solid border-b-2 border-gray-100">
          <h2 className="font-semibold">{title}</h2>
          {withAction && (
            <button type="button" className="text-blue-primary outline-remove" onClick={onChange}>
              {titleAction || "Change"}
            </button>
          )}
        </header>
        <section
          className={`${addressActive ? "" : "p-4"} text-sm sm:text-base`}
        >
          {children}
        </section>
        {withBorderBottom && (
          <div className="absolute w-full h-0.5 bottom-0">
            <div
              style={{
                backgroundImage: `url(${line})`,
                // backgroundAttachment: "fixed",
                backgroundRepeat: "repeat",
              }}
              className="h-full w-full"
            />
          </div>
        )}
      </div>
    </>
  );
};

ShippingCard.propTypes = {
  onChange: PropTypes.func
}
ShippingCard.defaultProps = {
  onChange: () => ''
};

export default ShippingCard;
