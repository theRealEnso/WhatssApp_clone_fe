import {useState,} from "react";

import {FC} from 'react';

import { ClassName } from "../App";

const ChatIcon: FC<ClassName> = ({ className }) => {
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
      fill={isHovered ? "#3fe8a4" : "#AEBAC1"}
      stroke={isHovered ? "#3fe8a4" : "#AEBAC1"}
      strokeWidth={1}
      style={{transition: "stroke 0.2s ease-in-out"}}
    >
      <path
        className={className}
        enableBackground="new    "
        d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"
      />
    </svg>
  );
};

export default ChatIcon;
