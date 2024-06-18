export const getFileType = (fileData) => {
    switch (fileData){
        case "application/pdf":
            return "PDF";
            break;

        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "Microsoft DOCX";
            break;
        
        case "application/vnd.oasis.opendocument.text":
            return "OpenDocument text doc";
            break;

        case "application/vnd.oasis.opendocument.spreadsheet":
            return "OpenDocument spreadsheet"
            break;

        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return "OpenDocument presentation";
            break;

        case "application/vnd.ms-powerpoint":
            return "Microsoft PowerPoint";
            break;
        
        case "text/html":
            return "HTML";
            break;

        case "text/plain":
            return "PLAIN TXT";
            break;
        
        case "application/vnd.rar":
            return "RAR";
            break;

        case "application/zip":
        case "application/x-zip-compressed":
            return "ZIP";
            break;
        
        case "audio/mpeg":
            return "MP3";
            break;
        case "audio/wav":
            return "WAV";
            break;
        
        case "image/png":
        case "image/jpeg":
        case "image/webp":
        case "image/gif":
            return "IMAGE";
            break;

        case "video/mp4":
        case "video/webm":
        case "video/mpeg":
            return "video";
            break;

        default:
            return fileData;
    }
};