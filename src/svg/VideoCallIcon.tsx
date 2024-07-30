import { FC, useState } from "react";
import { ClassName } from "../App";
import "./customIconColor.css";

export const VideoCallIcon: FC<ClassName> = ({className}) => {
    // console.log("VideoCallIcon rendered")
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${isHovered ? "fill-blue-500" : "fill-transparent"} stroke-blue-500 scale-[120%]`}
          fill="transparent"
          stroke={`${isHovered ? "stroke-cyan-600" : "stroke-blue-500"}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={
            {
                width: '24px', 
                height: '24px',
                transition: "fill 0.2s ease-in-out", 
            }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <path d="M23 7L16 12 23 17 23 7z"></path>
          <rect width="15" height="14" x="1" y="5" rx="2" ry="2"></rect>
        </svg>
      );
  }
  