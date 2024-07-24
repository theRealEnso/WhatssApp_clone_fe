import { useState } from 'react';

//import components
import { Ringer } from './ringer-component';
import { CallHeader } from './call-header-component';
import { CallArea } from './call-area-component';
import { CallActions } from './call-actions-component';

export const Call = ({phoneCall, setPhoneCall, phoneCallAccepted, myVideoFeed, recipientVideoFeed, stream}) => {
    const {receivingCall, callEnded} = phoneCall;

    const [showActions, setShowActions] = useState<boolean>(false);

    return (
    <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        >
        {/* container */}
        <div className="">
            <div>
                {/* Call Header */}
                <CallHeader></CallHeader>

                {/* call area */}
                <CallArea name={`Anonymous caller`}></CallArea>

                {/* call actions */}
                {
                    showActions && <CallActions></CallActions>
                }

                {/* video stream */}
                <div>
                    {/* recipient video feed */}
                    <div>
                        <video ref={recipientVideoFeed} playsInline muted autoPlay className={`largeVideoCall`}></video>
                    </div>

                    {/* my video feed */}
                    <div>
                        <video ref={myVideoFeed} playsInline muted autoPlay className={`${showActions ? "moveVideoCall" : ""} smallVideoCall`}></video>
                    </div>
                </div>
                

            </div>
        </div>

        {
            // if we are receiving a call, and we have not answered it yet, then display the `Ringer` component
            receivingCall && !phoneCallAccepted && 
                (
                    <Ringer phoneCall={phoneCall} setPhoneCall={setPhoneCall}></Ringer>
                )
        }
    </div>
  );
};
