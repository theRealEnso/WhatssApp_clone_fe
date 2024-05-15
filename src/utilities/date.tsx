import moment from "moment";

export const timestampHandler = (time) => {
    // console.log(typeof moment(time).fromNow()); string
    const timeElapsed = moment(time).fromNow();
    const timeByHourAndMinutes = moment(time).format("hh:mm");
    const timeByDayOfWeek = moment(time).format("dddd");
    const datedTimestamp = moment(time).format("MM/DD/YYYY");

    //if timeElapsed contains the words "a few seconds ago", then return "Just Now" instead
    if(timeElapsed.search("a few seconds ago") !== -1) {
        return "Just Now"
    }

    //if timeElapsed contains the words "a minute ago", then return "1 min"
    if(timeElapsed.search("a minute ago") !== -1){
        return "1 min";
    }

    //if timeElapsed contains the word "minutes", then the timeElapsed should read "X min" instead of the default "X minutes ago"
    if(timeElapsed.search("minutes") !== -1){
        const splitTimestamp = timeElapsed.split(" ");
        const newTimestampArray = splitTimestamp.map((word) => {
            if(word === "minutes"){
                return "min";
            } else if(word === "ago"){
                return ""
            } else {
                return word
            }
        });

        return newTimestampArray.join(" ");
    }

    //if timeElapsed reads "an hour ago", then it should instead read "1 hour ago"
    if(timeElapsed.search("an hour ago") !== -1){
        return "1 hour ago";
    }

    // if timeElapsed reads more than an hour ago, then display the time formatted in hh:mmm
    if(timeElapsed.search("hours ago") !== -1){
        return timeByHourAndMinutes;
    }

    //if timeElapsed reads "a day ago", then it should instead read "1 day ago"
    if(timeElapsed.search("a day ago") !== -1){
        return "1 day ago"
    }

    //if timeElapsed reads "a week ago", then it should read "1 week ago"
    if(timeElapsed.search("a week ago") !== -1){
        return "1 week ago"
    }

    //if timeElapsed contains the words "days ago", and the number of days is 7, then timeElapsed should read "1 week ago"
    //if the number of days is less than 7, then it should just return the day of the week
    //if the timeElapsed is greater than 7 days ago, then just show the date formated in MM/DD/YYYY

    if(timeElapsed.search("days ago") !== -1){
        const numberOfDays = timeElapsed.split(" ")[0];
        if(Number(numberOfDays) < 7){
            return timeByDayOfWeek;
        } else if (Number(numberOfDays) === 7) {
            return "1 week ago";
        } else {
            return datedTimestamp;
        }
    }
}