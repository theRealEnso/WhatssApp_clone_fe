export const FileImageVideo = ({url, type}) => {
  return (
    <div>
        {
            type === "IMAGE" ? <img src={url} alt=""></img> : <video src={url} controls></video>
        }
    </div>
  );
};
