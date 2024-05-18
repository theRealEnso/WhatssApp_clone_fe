import {FC, useState} from 'react';

import { ClassName } from "../App";

const SendIcon: FC<ClassName> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg 
    width="30" 
    height="30" 
    x="0" 
    y="0" 
    viewBox="0 0 24 24"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    stroke={isHovered ? "#3fe8a4" : "#fff"}
    style={{transition: "stroke 0.2s ease-in-out"}}
    >
      <path
        className={className}
        d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
      ></path>
    </svg>
  );
}

export default SendIcon;
