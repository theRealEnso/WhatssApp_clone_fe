import { useState } from 'react';

//import components
import { Ringer } from './ringer-component';
import { CallHeader } from './call-header-component';
import { CallArea } from './call-area-component';
import { CallActions } from './call-actions-component';

export const Call = ({videoCall, setVideoCall, videoCallAccepted, videoCallEnded, myVideoFeed, recipientVideoFeed, stream, answerCall, showCallComponent, endCall}) => {
    const {receivingCall, callEnded, name, picture} = videoCall;

    const [showActions, setShowActions] = useState<boolean>(false);
    const [toggleFrame, setToggleFrame] = useState<boolean>(false);

    return (
        <>
            <div 
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${receivingCall && !videoCallAccepted ? "hidden" : ""}`} // hide call component if user is receiving a call and has not accepted it
                onMouseEnter={() => setShowActions(true)}
                onMouseLeave={() => setShowActions(false)}>
                {/* container */}
                <div className="">
                    <div>
                        {/* Call Header */}
                        <CallHeader></CallHeader>

                        {/* call area */}
                        <CallArea name={`${name}`}></CallArea>

                        {/* call actions */}
                        {
                            showActions && <CallActions endCall={endCall}></CallActions>
                        }

                        {/* video stream */}
                        <div>
                            {/* recipient video feed */}
                            <div>
                                {
                                    videoCallAccepted && !videoCallEnded ? 
                                        (
                                            <video ref={recipientVideoFeed} 
                                                playsInline 
                                                muted 
                                                autoPlay 
                                                className={`${toggleFrame ? "smallVideoFrame" : "largeVideoFrame"}`}
                                                // className={`largeVideoFrame`}
                                                onClick={() => setToggleFrame(!toggleFrame)}
                                                >

                                            </video>
                                        ) : null
                                }
                            </div>

                            {/* my video feed */}
                            <div>
                                {
                                    stream ? (
                                        <video 
                                            ref={myVideoFeed} 
                                            playsInline 
                                            muted 
                                            autoPlay 
                                            className={`${showActions ? "moveVideoCall" : ""} ${toggleFrame ? "largeVideoFrame" : "smallVideoFrame"}`}
                                            onClick={() => setToggleFrame(!toggleFrame)}
                                            >

                                        </video>
                                    ) : null
                                }
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Ringing component*/}
            {
                // if user is receiving a call, and we have not answered it yet, then display the `Ringer` component
                receivingCall && !videoCallAccepted ?
                (
                    <Ringer 
                        videoCall={videoCall} 
                        answerCall={answerCall}
                        endCall={endCall}
                        >

                    </Ringer>
                ) : null
            }

            {/* calling ringtone */}
            {
                !videoCallAccepted && showCallComponent ? (
                    <audio src={`../../../audio/ringing.mp3`} autoPlay loop></audio>
                ) : null
            }
        </>
    
    );
};
