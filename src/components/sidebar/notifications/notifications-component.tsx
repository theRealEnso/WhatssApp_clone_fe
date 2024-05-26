import React from 'react'
import { NotificationIcon, ArrowIcon, CloseIcon } from "../../../svg";

export const Notifications = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 w-full p-[13px]">

        {/* container */}
        <div className="w-full flex items-center align-center justify-center gap-x-2 overflow-hidden">
            <div className="cursor-pointer flex flex-none">
                <NotificationIcon className="dark:fill-blue_1 cursor-pointer"></NotificationIcon>
            </div>

            <div className="flex flex-col flex-none mr-4 mt-2">
                <span className="dark:text-dark_text_1">Get notified of new messages!</span>
                <span className="dark:text-dark_text_2 flex items-center gap-x-2">
                    Turn on desktop notifcations
                    <ArrowIcon className="dark:fill-dark_svg_2 cursor-pointer"></ArrowIcon>
                </span>
            </div>

            <div className="flex flex-auto justify-end">
                <CloseIcon className="cursor-pointer dark:fill-dark_svg_2"></CloseIcon>
            </div>
        </div>

    </div>
  )
};
