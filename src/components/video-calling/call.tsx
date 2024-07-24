import { Ringer } from './ringer';

export const Call = ({phoneCall, setPhoneCall, phoneCallAccepted}) => {
    const {receivingCall, callEnded} = phoneCall;

    return (
    <div>
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
