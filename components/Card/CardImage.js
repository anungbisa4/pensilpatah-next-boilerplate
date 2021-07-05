import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image"
import Card from './Card'

export default function CardImage({ children, className, ...props }) {
  return (
    <Card className={`card-image ${className}`}>
      <Image {...props} />
      {children}
    </Card>
  );
}


CardImage.defaultProps = {
  src: "/img/no-image.webp",
  alt: "alt-img",
  width: 700,
  height: 475,
  className:
    "max-w-xs shadow-lg bg-white flex items-center justify-center p-5 rounded-xl",
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
