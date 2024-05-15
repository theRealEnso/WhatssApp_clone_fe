// import React from "react";
import {FC, useState} from 'react';

import { ClassName } from "../App";

const SearchLargeIcon: FC<ClassName> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg 
    width="28" 
    height="28" 
    x="0" 
    y="0" 
    viewBox="0 0 28 28"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    stroke={isHovered ? "#3fe8a4" : "#AEBAC1"}
    style={{transition: "stroke 0.2s ease-in-out"}}
    strokeWidth={2}
    >
      <path
        className={className}
        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
      ></path>
    </svg>
  );
}

export default SearchLargeIcon;
