import { useRef, useState } from "react";

export const PictureInput = ({readableImage, setReadableImage, setImage}) => {
    const [error, setError] = useState("");
    const inputRef = useRef();

    const handleImageSelection = (event) => {
        // const selectedImageData = event.target.files;
        // console.log(pictureData);
        const selectedImageData = event.target.files[0];

        if(selectedImageData.type !== "image/jpeg" && selectedImageData.type !== "image/png" && selectedImageData.type !== "image/webp"){
            setError(`${selectedImageData.name} format is not supported! Please use jpeg or png files only`);
            return;
        } else if (selectedImageData.size > 1024 * 1024 * 5) {
            setError(`${selectedImageData.size} exceeds 5 MB file size limit`);
            return;
        } else {
            setImage(selectedImageData)
            setError("")
        }

        //reading the picture
        //need to convert and represent file data as a base64-encoded string. This is required to embed images, videos, audio files, etc directly into web pages without the need for separate HTTP requests
        //Before the widespread use of data URLs, embedding images, videos, or audio files into web pages typically involved referencing external files using HTML tags or CSS properties. Here's how you would embed these resources without data URLs:
        //example: <img src="path/to/image.jpg" alt="Description of the image">
        //With data URLs, the location of the original file doesn't matter once the file's data is embedded into the URL. Data URLs encode the actual data of the file directly into the URL itself, so they are self-contained and don't rely on the original file location. Therefore, even if the original file is moved or deleted, the embedded data in the data URL remains intact. This is one of the advantages of using data URLs for embedding resources like images, videos, or audio files. It makes the embedding process more self-contained and independent of the file's location or availability on a server. However, it's important to note that embedding large files using data URLs can increase the size of the HTML or CSS file, potentially affecting load times and performance.

        const reader = new FileReader(); // create a new file reader object, which provides methods to read contents of files
        reader.readAsDataURL(selectedImageData); // readAsDataURL is a method on FileReader. Reads content of the specified file and creates a data URL representing the file's data
        reader.onload = (event) => setReadableImage(event.target.result); //onload event fires right after when the data is successfully read and the data URL is created => set data URL in state variable

    };

    const toggleImageUpload = () => inputRef.current.click();

    const handleImageChange = () => {
        setImage("");
        setReadableImage("");
        toggleImageUpload();
    }

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
        <label className="text-sm font-bold tracking-wide">Picture (optional)</label>

        {readableImage ? 
            (<div>
                <img src={readableImage} alt="profile picture" className="w-20 h-20 object-cover rounded-full"></img>
                <div className="w-40 mt-2 py-1 dark:bg-dark_bg_3 rounded-md text-xs flex items-center justify-center cursor-pointer" onClick={handleImageChange}>Change Picture</div>
            </div>
            )
            : (<div className="w-full h-12 dark:bg-dark_bg_3 rounded-xl font-bold flex items-center justify-center cursor-pointer" onClick={toggleImageUpload}>
                    Upload Picture
                </div>
            )
        }


        <input type="file" accept="image/png, image/jpeg/ image/webp" name="picture" id="picture" hidden onChange={handleImageSelection} ref={inputRef}></input>

        {/* error */}
        <div>
            <p className="text-red-400">{error}</p>
        </div>

    </div>
  );
};
