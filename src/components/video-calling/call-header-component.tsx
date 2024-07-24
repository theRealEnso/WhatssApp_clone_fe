import { ArrowIcon, LockIcon,} from "../../svg";
import { AddContactIcon } from "../../svg/AddContact";


export const CallHeader = () => {
  return (
    <header className="absolute top-0 w-full z-40">
        <div className="p-1 flex items-center justify-between">
            {/* return button */}
            <button className="btn">
                <span className="rotate-180 scale-150">
                    <ArrowIcon className="fill-white"></ArrowIcon>
                </span>
            </button>

            {/* end to end encrypted tex */}
            <p className="flex items-center space-x-2">
                <LockIcon className="fill-white"></LockIcon>
                <span className="text-xs text-white">End-to-End Encrypted</span>
            </p>

            {/* Add contact to call */}
            <button className="btn">
                <AddContactIcon className="fill-white"></AddContactIcon>
            </button>
        </div>
    </header>

  );
};
