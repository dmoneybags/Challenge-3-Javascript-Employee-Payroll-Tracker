// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  
  //Create a flag for whether or not we should keep asking for data
  const employees = [];
  let enteringData = true;
  while(enteringData){
    //Template for our employee object
    let employee = {
      firstName: "",
      lastName: "",
      salary: 0
    }
    firstNameStr = prompt("Enter the employees first name");
    if (firstNameStr === "" || firstNameStr === null){
      console.log("User cancelled or entered an empty string")
      break;
    }
    employee["firstName"] = firstNameStr;
    lastNameStr = prompt("Enter the employees last name");
    if (lastNameStr === "" || lastNameStr === null){
      console.log("User cancelled or entered an empty string")
      break;
    }
    employee["lastName"] = lastNameStr;
    //set a flag for if our salary is invalid
    let salaryInvalid = true;
    while (salaryInvalid){
      salary = prompt("Enter the employees salary");
      salaryInvalid = isNaN(salary);
      if (salaryInvalid){
        alert(salary + " is an invalid salary");
      }
      //code will exit as long as salary is valid
    }
    if (salary === "" || salary === null){
      console.log("User cancelled or entered an empty string");
      break;
    }
    employee["salary"] = Number(salary);
    employees.push(employee);
    enteringData = confirm("Add another employee?");
  }
  console.log("returning our employee array");
  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  let totalSalary = 0;
  const totalEmployees = employeesArray.length;
  for (employee of employeesArray){
    totalSalary += employee.salary;
  }
  console.log("Average salary of employees: $" + (totalSalary/totalEmployees));
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  const randomEmployee = Math.floor(Math.random() * employeesArray.length);
  console.log("CONGRATULATIONS TO THE WINNER OF OUR DRAWING: " + employeesArray[randomEmployee].firstName)
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
