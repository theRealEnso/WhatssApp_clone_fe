import { useState, useEffect, useCallback } from "react";

//import SVG icons
import { CloseIcon,  } from "../../svg";
import { ValidIcon } from "../../svg/ValidIcon";

export const Ringer = ({phoneCall, setPhoneCall}) => {
    const {receivingCall, callEnded} = phoneCall;

    const [timer, setTimer] = useState<number>(0);

    //every second, the `timer` state updates because it increments by 1
    //this entire component re-renders everytime `timer is updated
    //on each re-render, the useEffect runs again. But, before it runs, the cleanup function from the previous render is called to clear the old interval. This ensures that there is only one interval at a time.

    //useCallback => handleTimer function gets re-created every time the component renders, creating a new function object
    //since handleTimer is defined in the useEffect's dependency array (and gets re-created on every render), React thinks the dependencies have changed, too
    //As a result, the useEffect hook will re-run on every render, leading to performance issues. Use the useCallback hook to memoize the function
    const handleTimer = useCallback(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    // console.log(timer);

    useEffect(() => {
        if(timer <= 5){
            const cleanup = handleTimer(); // cleanup variable contains the clean up function `() => clearInterval(interval);
            return cleanup;
        } else {
            setPhoneCall({...phoneCall, receivingCall: false})
        } 

    }, [timer, handleTimer, phoneCall, setPhoneCall]);

  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">

        {/* container */}
        <div className="p-4 flex items-center justify-between gap-x-8">
            {/* call information */}
            <div className="flex items-center gap-x-2 space-x-4">
                <img 
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5c6eldGb8Bzlx0wIuvOUkZnsIo3pqVbVNw&s`} 
                    alt={`caller profile picture`}
                    className={`w-28 h-28 rounded-full`}
                    >

                </img>

                <div>
                    <h1 className="dark:text-white">
                        <b>Anonymous</b>
                    </h1>
                    <span className="dark:text-dark_text_2">WhatsApp Video</span>
                </div>
            </div>

            {/* call actions */}
            <ul className="flex items-center gap-x-2">
                <li>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500"><ValidIcon className="fill-white w-5"></ValidIcon></button>
                </li>
                <li>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500"><CloseIcon className="fill-white w-6"></CloseIcon></button>
                </li>
            </ul>
        </div>

        {/* Ring-tone */}
        <audio src="../../../audio/ringtone.mp3" autoPlay loop></audio>
    </div>
  );
};
