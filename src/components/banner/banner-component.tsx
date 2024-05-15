import { Logo } from "../../svg";

export const Banner = () => {
  return (
    <div className="min-h-screen w-full text-white dark:bg-dark_bg_2 flex items-center justify-center border-b-8 border-green_2">
        <div className="flex flex-col items-center justify-center">
            <Logo></Logo>
            <h1 className="text-5xl dark:text-green_1 tracking-wide my-6">WhatsApp</h1>
            <div>
                <p className="text-md tracking-wide dark:text-dark_text_2">Send and receive messages without keeping your phone online 24/7 !</p>
                <p className="text-sm dark:text-dark_text_2">Use WhatsApp on up to 4 linked devices and 1 mobile device at the same time</p>
            </div>
        </div>
    </div>
  );
};
