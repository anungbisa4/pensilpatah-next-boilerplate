import { useState } from "react";
import dynamic from 'next/dynamic';
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainBanner = dynamic(() => import("@/components/Banner/MainBanner"));

const SharedArticle = ({ ...props }) => {
  return (
    <div className="shared-article mt-6">
      <h4 className="text-center text-sm font-semibold">Share this article</h4>
      <div className="share-icon flex justify-center py-2">
        <div className="w-8 h-8 flex items-center justify-center border-2 border-solid border-gray-light-dark rounded-full">
          <FontAwesomeIcon icon={faFacebookF} color="#4267B2" />
        </div>
        <div className="w-8 h-8 flex items-center justify-center border-2 border-solid border-gray-light-dark rounded-full mx-4">
          <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" />
        </div>
        <div className="w-8 h-8 flex items-center justify-center border-2 border-solid border-gray-light-dark rounded-full">
          <FontAwesomeIcon icon={faInstagram} color="#8a3ab9" />
        </div>
      </div>
    </div>
  );
};

export default SharedArticle;
