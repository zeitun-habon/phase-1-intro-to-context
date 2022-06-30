// Your code here
function createEmployeeRecord(array){
    let employeeRecord = {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [] 
    }
    return employeeRecord;
}

function createEmployeeRecords(records){
    let employeeRecords = records.map(record => createEmployeeRecord(record))
    return employeeRecords
}

function createTimeInEvent(empRec, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    empRec.timeInEvents.push({
        type : "TimeIn",
        hour: parseInt(hour,10),
        date,
    })

    return empRec
}

function createTimeOutEvent(empRec, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    empRec.timeOutEvents.push({
        type: "TimeOut",
        hour : parseInt(hour, 10),
        date
    })

    return empRec
}

function hoursWorkedOnDate(employee, workDate){
    let inTheEvent = employee.timeInEvents.find((e)=>{
        return e.date === workDate
    })

    let outOfTheEvent = employee.timeOutEvents.find((e)=>{
        return e.date === workDate
    })

    return (outOfTheEvent.hour - inTheEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateWork){
    let wageEarned = hoursWorkedOnDate(employee, dateWork) * employee.payPerHour
    return parseFloat(wageEarned.toString())
}

function allWagesFor(employee){
    let eligbleDates = employee.timeInEvents.map((e)=>{
        return e.date
    })

    let payable = eligbleDates.reduce((memo, d)=>{
        return memo + wagesEarnedOnDate(employee,d)
    }, 0)

    return payable
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((memo, rec)=>{
        return memo + allWagesFor(rec)
    }, 0)
}