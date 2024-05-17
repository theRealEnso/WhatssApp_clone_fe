import React from 'react'
import { NotificationIcon, ArrowIcon, CloseIcon } from "../../../svg";

export const Notifications = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 w-full flex items-center p-[13px]">

        {/* container */}
        <div className="w-full flex items-center justify-between">
            
            {/* Left side */}
            <div className="flex items-center gap-x-4">
                <div className="cursor-pointer">
                    <NotificationIcon className="dark:fill-blue_1 cursor-pointer"></NotificationIcon>
                </div>

                <div className="flex flex-col flex-1 mr-4">
                    <span className="dark:text-dark_text_1">Get notified of new messages!</span>
                    <span className="dark:text-dark_text_2 flex items-center gap-x-2">
                        Turn on desktop notifcations
                        <ArrowIcon className="dark:fill-dark_svg_2 cursor-pointer"></ArrowIcon>
                    </span>
                </div>
            </div>

        </div>

        {/* Right side */}
        <div className="">
            <CloseIcon className="cursor-pointer dark:fill-dark_svg_2"></CloseIcon>
        </div>
    </div>
  )
};
