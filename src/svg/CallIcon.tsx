import { FC } from 'react';
import { ClassName } from "../App";

export const CallIcon: FC<ClassName> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 68 68"
      className={`fill-transparent stroke-blue-500 scale-[120%] hover:fill-blue-500 transition-colors duration-200 ease-in-out ${className}`}
      fill="transparent"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{
        width: '24px',
        height: '24px',
        transition: 'fill 0.2s ease-in-out',
      }}
    >
      <path
        d="M46.78 60.38a12.84 12.84 0 01-6.88-2A111.62 111.62 0 015.63 24.1 12.76 12.76 0 017.39 8.16l3.08-3.07a6.36 6.36 0 019 0l4.4 4.4a7.18 7.18 0 01.67 9.34l-1.41 1.89a3.54 3.54 0 00.32 4.59l16.06 16.06a3.54 3.54 0 004.59.33l1.9-1.42a7.18 7.18 0 019.34.67l3.58 3.58a6.36 6.36 0 010 9l-3.07 3.08a12.78 12.78 0 01-9.07 3.77zm-39-37.61a109.202 109.202 0 0033.45 33.49 10.28 10.28 0 0012.84-1.42l3.08-3.08a3.87 3.87 0 000-5.46l-3.59-3.58a4.67 4.67 0 00-6.07-.44L45.6 43.7a6.05 6.05 0 01-7.86-.56l-16-16.06a6 6 0 01-.56-7.86l1.41-1.89a4.66 4.66 0 00-.44-6.07L17.7 6.85a3.87 3.87 0 00-5.46 0L9.16 9.93a10.28 10.28 0 00-1.42 12.84h.04z"
      ></path>
    </svg>
  );
};
