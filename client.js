$(document).ready(onReady);
console.log("locked in");

const employees = [];

function addEmployee() {
  if (
    !$("#firstName").val() ||
    !$("#lastName").val() ||
    !$("#idNumber").val() ||
    !$("#jobTitle").val() ||
    !$("#annualSalary").val()
  ) {
    alert("Input(s) can not be left blank");
    return false;
  } else {
    const employee = {
      firstName: $(`#firstName`).val(),
      lastName: $(`#lastName`).val(),
      idNumber: $(`#idNumber`).val(),
      jobTitle: $(`#jobTitle`).val(),
      annualSalary: $(`#annualSalary`).val(),
    };

    employees.push(employee);

    $(`#firstName`).val(``);
    $(`#lastName`).val(``);
    $(`#idNumber`).val(``);
    $(`#jobTitle`).val(``);
    $(`#annualSalary`).val(``);
  }
  showEmployee();
  calculateTotalMonthlyCosts();
} // end addEmployee

function onReady() {
  pageLoad();
  calculateTotalAnnualSalary();
  calculateTotalMonthlyCosts();

  $(`.addEmployeeBtn`).on(`click`, addEmployee);
  $(document).on(`click`, ".removeEmployeeBtn", removeEmployee);
} // end onReady

function pageLoad() {
  console.log("hello pageLoad");

  /// start addEmployeeBox

  $(`.addEmployeeBox`).append(`
<h2>Add Employee</h2>
`); // end add employee h2

  // inputInfo array
  let inputInfo = [
    { id: "firstName", placeholder: "First Name" },
    { id: "lastName", placeholder: "Last Name" },
    { id: "idNumber", placeholder: "ID Number" },
    { id: "jobTitle", placeholder: "Job Title" },
    { id: "annualSalary", placeholder: "Annual Salary" },
  ]; // end inputInfo array

  console.log(inputInfo);

  for (let i = 0; i < inputInfo.length; i++) {
    $(`.addEmployeeBox`).append(`
    <input id="${inputInfo[i].id}" type="text" placeholder="${inputInfo[i].placeholder}">
    `);
  } // end inputInfo array

  // submit button
  $(`.addEmployeeBox`).append(`
<button class="addEmployeeBtn">Submit</button>
`); // end submit button

  // Employees table heading
  $(`.employeesBox`).append(`
<h2>Employees</h2>
`); // end Employees table heading

  //Add Employees Table
  $(`.employeesBox`).append(`
<table>
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>ID Number</th>
                <th>Job Title</th>
                <th>Salary</th>
                <th></th> 
                </tr>
            </thead>
            <tbody class="employeeTable">
            </tbody>
            <tfoot>
            </tfoot>
        </table>
`); // end Add Employees Table

  // h2 total monthly salary costs
  $(`.employeesBox`).append(`
<h2>Total Monthly Salary Cost: $<span id="totalMonthlySalaryCost"></span></h2>
`); // end h2 total monthly salary costs
} // end pageLoad

function showEmployee() {
  $(`.employeeTable`).empty();
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    $(`.employeeTable`).append(`
    <tr id="${[i]}"> 
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.idNumber}</td>
        <td>${employee.jobTitle}</td>
        <td>${employee.annualSalary}</td>
        <td><button class="removeEmployeeBtn">Delete</button></td>
        </tr>
    `);
  }
} // end showEmployees

function calculateTotalAnnualSalary() {
  let totalAnnualSalary = 0;
  for (let i = 0; i < employees.length; i++) {
    totalAnnualSalary += Number(employees[i].annualSalary);
  }
  return totalAnnualSalary;
} // end calculateTotalAnnualSalary

function calculateTotalMonthlyCosts() {
  let totalMonthlySalaryCosts = Math.round(calculateTotalAnnualSalary() / 12);
  $(`#totalMonthlySalaryCost`).empty();
  $(`#totalMonthlySalaryCost`).append(totalMonthlySalaryCosts);
  if (totalMonthlySalaryCosts >= 20000) {
    $(`#totalMonthlySalaryCost`).css(`background-color`, `red`);
  }
  if (totalMonthlySalaryCosts < 20000) {
      $(`#totalMonthlySalaryCost`).css(`background-color`, `white`);
  }
} // end calculateTotalMonthlyCosts

// total hat tip to this video for providing the inspiration to add an id to the first element of the table
// https://www.youtube.com/watch?v=zatTQcswPUs
function removeEmployee() {
  let removeText = $(this).text();
  let removeTarget = $(this).parent().parent();
  let removeTargetId = $(removeTarget).attr("id");
  if (removeText === "Delete") {
    $(this).parent().parent().remove();
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      if (`${[i]}` === removeTargetId) {
        employees.splice([i], 1);
      }
    }
    calculateTotalAnnualSalary();
    calculateTotalMonthlyCosts();
  }
} // end removeEmployee
