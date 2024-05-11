export const truncate = (string: string, maxLengthNumber: Number) => {
    if(string.length > 25){
        return string.substring(0,25).concat("...");
    } else {
        return string;
    }
} 