export const FileImageVideo = ({url, type}) => {
  return (
    <div>
        {
            type === "IMAGE" ? <img src={url} alt="" className="cursor-pointer"></img> : <video src={url} className="cursor-pointer" controls></video>
        }
    </div>
  );
};
