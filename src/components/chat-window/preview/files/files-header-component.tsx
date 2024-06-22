import { useDispatch, useSelector } from "react-redux"

import { selectFiles } from "../../../../redux/chat/chatSelector";
import { removeFiles } from "../../../../redux/chat/chatReducer";

import { CloseIcon } from "../../../../svg"

export const FilesHeader = ({activeIndex}) => {
    const dispatch = useDispatch();

    const files = useSelector(selectFiles);

    const clearFiles = () => {
        dispatch(removeFiles());
    };

  return (
    <div className="w-full">

        {/* container */}
        <div className="w-full flex items-center justify-between">
            <div className="translate-x-4 cursor-pointer" onClick={clearFiles}>
                <CloseIcon className="dark:fill-dark_svg_1"></CloseIcon>
            </div>

            {/* file name */}
            {
                files.length > 0 && files[activeIndex] && files[activeIndex].file && files[activeIndex].file.name
                ? (<h1 className="dark:text-dark_text_1 text-[15px]">{files[activeIndex]?.file.name}</h1>)
                : null
            }
            

            {/* empty tag */}
            <span></span>
        </div>
    </div>
  )
}
