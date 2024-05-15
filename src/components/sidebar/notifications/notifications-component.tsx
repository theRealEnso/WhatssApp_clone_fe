import React from 'react'
import { NotificationIcon, ArrowIcon, CloseIcon } from "../../../svg";

export const Notifications = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 w-full flex justify-between items-center p-4">

        <div className="flex-none mr-4">
            <NotificationIcon className="dark:fill-blue_1 cursor-pointer"></NotificationIcon>
        </div>

        <div className="flex flex-auto flex-col mr-4">
            <span className="dark:text-dark_text_1">Get notified of new messages!</span>
            <span className="dark:text-dark_text_2 flex items-center gap-x-2 mt-0.5">
                Turn on desktop notifcations
                <ArrowIcon className="dark:fill-dark_svg_2 cursor-pointer"></ArrowIcon>
            </span>
        </div>
    

        <div className="flex flex-auto p-2">
            <CloseIcon className="cursor-pointer dark:fill-dark_svg_1"></CloseIcon>
        </div>
    </div>
  )
};
