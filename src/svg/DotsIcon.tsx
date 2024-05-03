// import React from "react";
import {FC, useState} from 'react';

import { ClassName } from "../App";

const DotsIcon: FC<ClassName> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <svg
      viewBox="0 0 24 24"
      height={35}
      width={35}
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      fill={isHovered ? "#3fe8a4" : "#AEBAC1"}
      stroke={isHovered ? "#3fe8a4" : "#AEBAC1"}
      style={{transition: "stroke 0.2s ease-in-out"}}
    >
      <path
        className={className}
        d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
      />
    </svg>
  );
};

export default DotsIcon;
