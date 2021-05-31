// Your code here
function createEmployeeRecord ([firstname,lastname,title,pay]) {
    let card = {
        "firstName": firstname,
        "familyName": lastname,
        "title": title,
        "payPerHour": pay,
        "timeInEvents": [],
        "timeOutEvents": []
    }
    return card
}

function createEmployeeRecords(arrays) {
    let employeeRecords =  arrays.map(array => createEmployeeRecord(array))
    return employeeRecords
}

function createTimeInEvent(array, dateStamp) {
    let obj = {
        "type" : "TimeIn",
        "hour" : parseInt(dateStamp.substring(dateStamp.length-4,dateStamp.length)),
        "date" : dateStamp.substring(0,10)
    }
    array.timeInEvents.push(obj)

    return array
}

function createTimeOutEvent(array, dateStamp) {
    let obj = {
        "type" : "TimeOut",
        "hour" : parseInt(dateStamp.substring(dateStamp.length-4,dateStamp.length)),
        "date" : dateStamp.substring(0,10)
    }
    array.timeOutEvents.push(obj)

    return array
}

function hoursWorkedOnDate(array, dateTarget) {
    let timeIn = array.timeInEvents
    let timeOut = array.timeOutEvents
    let inTime
    let outTime
    timeIn.forEach(day => {
        if (day.date == dateTarget) {
            inTime = day.hour
        }
    })
    timeOut.forEach(day=>{
        if (day.date == dateTarget) {
            outTime = day.hour
        }
    })
    
    let hoursWorked = (outTime - inTime)/100

    return hoursWorked
}

function wagesEarnedOnDate(array, dateTarget) {
    let amountOwed = hoursWorkedOnDate(array, dateTarget) * array.payPerHour
    return amountOwed
}

function allWagesFor(array) {
    let availDates = []
    let wageArry = []
    array.timeInEvents.forEach(dates=> {
        availDates.push(dates.date)
    })
    let reducer = (acc, cV) => acc + cV
    availDates.forEach(date=> {
        wageArry.push(wagesEarnedOnDate(array, date))
    })
    return wageArry.reduce(reducer)
}

function findEmployeeByFirstName(srcArray, name) {
    srcArray.forEach(record => {
        if (record.firstName == name) {
            return record
        }
    })
    return "undefined"
}

function calculatePayroll(array) {
    let reducer = (acc,cV) => acc + cV
    let total = []
    array.forEach(record =>{
        total.push(allWagesFor(record))
    })
    return total.reduce(reducer)
}