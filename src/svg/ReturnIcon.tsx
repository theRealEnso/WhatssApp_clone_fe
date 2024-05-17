// import React from "react";
import {FC, useState} from 'react';

import { ClassName } from "../App";

const ReturnIcon: FC<ClassName> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg
      viewBox="0 0 24 24"
      height={24}
      width={24}
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      stroke={isHovered ? "#3fe8a4" : "#008069"}
      style={{transition: "stroke 0.2s ease-in-out"}}
    >
      <path
        className={className}
        d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
      />
    </svg>
  );
};

export default ReturnIcon;
