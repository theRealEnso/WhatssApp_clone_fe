import { useCallback, useState, useEffect } from "react";
import { capitalizeName } from "../../utilities/capitalize";

export const CallArea = ({name, videoCallAccepted}) => {

  const [totalSecondsInCall, setTotalSecondsInCall] = useState<number>(0);
    // timer function
  const incrementSeconds = useCallback(() => {
    const timerInterval = setInterval(() => {
        setTotalSecondsInCall((previousValue) => previousValue + 1);
      }, 1000);

      return () => clearInterval(timerInterval);
      
  }, []);

  useEffect(() => {
    if(videoCallAccepted){
      const cleanup = incrementSeconds();
      return cleanup;
    }
  },[videoCallAccepted, incrementSeconds]);

  console.log(totalSecondsInCall);
  
  return (
    <div className="absolute top-12 w-full p-1 z-40">
        {/* container */}
        <div className="flex flex-col items-center">
            {/* call information */}
            <div className="flex flex-col items-center gap-y-1">
                <h1 className="text-white text-lg">
                    <b>{name ? capitalizeName(name) : ""}</b>
                </h1>
                
                {
                  videoCallAccepted 
                    ? <>
                        <div className="flex">
                          {/* span to display the hours elapsed */}
                          <span className="dark:text-dark_text_1">
                            {
                              // if the hours that has elapsed is less than 1, then don't display anything.
                              //if the hours that has elapsed is 1, then it should display `01`. Every hour after is incremented
                              //if hours that elapsed is a double digit number (i.e 13 hours), then it should display `13'
                              //edge case for 24 hours elapsing, maybe reset the timer to 0
                              Math.floor(totalSecondsInCall / 3600) < 1 ? null
                              : Math.floor((totalSecondsInCall / 3600)).toString().length < 2 ? ":" + "0" + parseInt(Math.floor(totalSecondsInCall / 3600).toString())
                              : ":" + parseInt(Math.floor(totalSecondsInCall / 3600).toString())
                            }
                          </span>

                          {/* span to display the minutes elapsed */}
                          <span className="dark:text-dark_text_1">
                            {
                              //if minutes that has elapsed is less than 10, like 5 for example, then span should show `05`. If minutes is greater than 10, then it should show that exact number, all the way up until 59
                              // if minutes is exactly 60, then it should reset back to 0
                              Math.floor((totalSecondsInCall % 3600) / 60).toString().length < 2 ? "0" + parseInt(Math.floor((totalSecondsInCall % 3600) / 60).toString())
                                : Math.floor((totalSecondsInCall % 3600) / 60) <= 59 ? Math.floor((totalSecondsInCall % 3600) / 60)
                                : "00"
                            }
                          </span>

                          {/* span to display the seconds elapsed */}
                          <span className="dark:text-dark_text_1"> : 
                            {
                              Math.floor(totalSecondsInCall % 60).toString().length < 2 ? "0" + parseInt(Math.floor(totalSecondsInCall % 60).toString())
                              : Math.floor(totalSecondsInCall % 60) <= 59 ? Math.floor(totalSecondsInCall % 60)
                              : "00"
                            }
                          </span>
                        </div>

                      </>
                    : <span className="dark:text-dark_text_1">Ringing...</span>
                }
                
            </div>
        </div>
    </div>
  );
};
