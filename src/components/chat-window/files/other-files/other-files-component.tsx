import DownloadIcon from "../../../../svg/DownloadIcon";

export const OtherFiles = ({file, type, me}) => {
    // console.log(file)
  return (
    <div className={`${me ? "bg-green_4" : "bg-dark_bg_1"} p-2 rounded-lg`}>
        {/* container */}

        <div className="flex justify-between gap-x-8">

            {/* file information */}
            <div className="flex items-center gap-4">
                <img src={`../../../../images/files/${type}.png`} alt="" className="w-8 object-contain"></img>
                <div className="flex flex-col gap-2">
                    <h1>{file.original_filename}.{file.public_id.split(".")[1]}</h1>
                    <span className="text-sm">{`${type} file, ${(file.bytes / 1048576).toFixed(2)} MB`}</span>
                </div>
            </div>

            {/* download button */}
            <a href={file.secure_url} target="_blank" download>
                <DownloadIcon className="cursor-pointer"></DownloadIcon>
            </a>
        </div>
    </div>
  );
};
