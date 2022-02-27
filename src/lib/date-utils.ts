
export function addDays(date : Date, daysAdded : number, fallbackDate : Date): Date{
    let current;
    if (date == null){
    current = new Date(date);
    }
    else{
    current = new Date(date); //if sent in as string or date we can handle either
    }

    let addDate = new Date(current.setDate(current.getDate() + daysAdded));
    return addDate;
}

export function getFormattedDate(date : Date): string{
	var year = date.getFullYear();

	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;

	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	
	return month + '/' + day + '/' + year;
}

export function getLongFormattedDate(date : Date): string{
	var year = date.getFullYear();

	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;

	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;

    var hr = date.getHours().toString();
    hr = hr.length > 1 ? hr : '0' + hr;

    var min = date.getMinutes().toString();
    min = min.length > 1 ? min : '0' + min;
	
	return month + '/' + day + '/' + year + ', ' + hr + ':' + min;
}