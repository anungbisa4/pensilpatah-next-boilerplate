import { useState } from 'react'
import PropTypes from "prop-types";

export default function Card({children, className, withHeader , titleHeader , rightHeaderAction}) {
  return (
    <div className={className}>
      {withHeader && (
        <div className="p-4 border-b-2 flex justify-between">
          <h2 className="text-sm font-medium">
            {titleHeader || "Title Header"}
          </h2>
          {rightHeaderAction || ""}
        </div>
      )}
      {children}
    </div>
  );
}

Card.defaultProps = {
  className: "bg-white shadow-xl rounded-2xl p-4 px-3",
};