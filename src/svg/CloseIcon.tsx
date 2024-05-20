// import React from "react";
import {FC, useState} from 'react';

import { ClassName } from "../App";

const CloseIcon: FC<ClassName> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg
      viewBox="0 0 24 24"
      height={36}
      width={36}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      stroke={isHovered ? "#3fe8a4" : "#fff"}
      style={{transition: "stroke 0.2s ease-in-out"}}
    >
      <path d="M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z" />
    </svg>
  );
};

export default CloseIcon
