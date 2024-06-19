export const getFileType = (fileData: string) => {
    switch (fileData){
        case "application/pdf":
            return "PDF";
            break;

        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "DOCX";
            break;

        case "application/vnd.ms-powerpoint":
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return "PPTX";
            break;
        
        case "text/html":
            return "HTML";
            break;

        case "text/plain":
            return "TXT";
            break;
        
        case "application/vnd.rar":
            return "RAR";
            break;

        case "application/zip":
        case "application/x-zip-compressed":
            return "ZIP";
            break;
        
        case "audio/mpeg":
        case "audio/wav":
            return "AUDIO";
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
            return "VIDEO";
            break;

        default:
            return "IMAGE";
    }
};