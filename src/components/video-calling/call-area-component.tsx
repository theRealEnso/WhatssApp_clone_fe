import { capitalizeName } from "../../utilities/capitalize";

export const CallArea = ({name}) => {
  return (
    <div className="absolute top-12 w-full p-1 z-40">
        {/* container */}
        <div className="flex flex-col items-center">
            {/* call information */}
            <div className="flex flex-col items-center gap-y-1">
                <h1 className="text-white text-lg">
                    <b>{name ? capitalizeName(name) : ""}</b>
                </h1>
                <span className="dark:text-dark_text_1">Ringing...</span>
            </div>
        </div>
    </div>
  );
};
