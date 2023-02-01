// createEmployeeRecord function
const createEmployeeRecord = (data) => {
    const [firstName, familyName, title, payPerHour] = data;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  // createEmployeeRecords function
  const createEmployeeRecords = (employeeData) => {
    return employeeData.map(createEmployeeRecord);
  };
  
  // createTimeInEvent function
  const createTimeInEvent = (employee, time) => {
    const [date, hour] = time.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10),
    });
    return employee;
  };
  
  // createTimeOutEvent function
  const createTimeOutEvent = (employee, time) => {
    const [date, hour] = time.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10),
    });
    return employee;
  };
  
  // hoursWorkedOnDate function
  const hoursWorkedOnDate = (employee, date) => {
    const timeInEvents = employee.timeInEvents.filter(
      (event) => event.date === date
    );
    const timeOutEvents = employee.timeOutEvents.filter(
      (event) => event.date === date
    );
    if (!timeInEvents.length || !timeOutEvents.length) return 0;
    
    let totalHours = 0;
    timeInEvents.forEach((timeInEvent, index) => {
      let timeOutEvent = timeOutEvents[index];
      let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      totalHours += hoursWorked;
    });
    return totalHours;
  };
  
  // wagesEarnedOnDate function
  function wagesEarnedOnDate(employee, date) {
    if (!employee) {
      return 0;
    }
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let totalWages = 0;
    const timeInEvents = employee.timeInEvents;
    const timeOutEvents = employee.timeOutEvents;
    timeInEvents.forEach((timeInEvent, index) => {
      let timeOutEvent = timeOutEvents[index];
      let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      totalWages += hoursWorked * employee.payPerHour;
    });
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    let payroll = 0;
    employees.forEach(employee => {
      payroll += allWagesFor(employee);
    });
    return payroll;
  }
