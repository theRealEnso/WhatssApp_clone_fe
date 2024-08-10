import axios from "axios";

const cloudinary_name = import.meta.env.VITE_REACT_APP_CLOUDINARY_API_NAME;
const cloudinary_key = import.meta.env.VITE_REACT_APP_CLOUDINARY_UNSIGNED_UPLOAD_PRESET_NAME;
const cloudinary_secret = import.meta.env.VITE_REACT_APP_CLOUDINARY_API_SECRET_KEY;
const cloudinary_url = import.meta.env.VITE_REACT_APP_CLOUDINARY_URL;

export const uploadFiles = async (files) => {
    const formData = new FormData();
    formData.append("upload_preset", cloudinary_key); // "upload_preset" is a required and reserved keyword for cloudinary

    let uploadedFiles = [];

    //for each file in the array, append it to the form data and then upload it to cloudinary.
    //get the result data from cloudinary, then use this result to store inside an object to store in the uploadedFiles array
    for(const f of files){
        const {file, type} = f;
        formData.append("file", file); // "file" is required and reserved keyword for cloudinary
        const result = await uploadToCloudinary(formData);
        
        uploadedFiles.push({
            file: result,
            type: type,
        });
    }

    return uploadedFiles;
};

const uploadToCloudinary = async (formData) => {
    try {
        const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary_name}/raw/upload`, formData);
        // console.log(data);
        return data;
    } catch(error){
        console.error(error);
        throw error;
    }
};

// const uploadToCloud = async (formData, type) => {
//     return new Promise(async (resolve, reject) => {
//         return await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary_name}/raw/upload`, formData)
//         .then(({data}) => {
//             resolve(data);
//         }).catch((error) => {
//             reject(error);
//             console.log(error);
//         });
//     });
// };
