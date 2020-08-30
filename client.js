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
<table class="employeeInfo">
            <thead>
                <tr>
                <th class="tableContents">First Name</th>
                <th class="tableContents">Last Name</th>
                <th class="tableContents">ID Number</th>
                <th class="tableContents">Job Title</th>
                <th class="tableContents">Salary</th>
                <th class="tableContents"></th> 
                </tr>
            </thead>
            <tbody class="employeeTable">
            </tbody>
            <tfoot class="tableFoot">
            </tfoot>
        </table>
`); // end Add Employees Table

  // h2 total monthly salary costs
  $(`.employeesBox`).append(`
<h2 class="totalMonthlySalaryCost">Total Monthly Salary Cost:
 $<span id="totalMonthlySalaryCost"></span></h2>
`); // end h2 total monthly salary costs
} // end pageLoad

// total hat tip to this video for providing the inspiration to add an id with a loop
// to the tr element of the deleted item of the table
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

function showEmployee() {
  $(`.employeeTable`).empty();
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    $(`.employeeTable`).append(`
    <tr id="${[i]}"> 
        <td class="tableContents">${employee.firstName}</td>
        <td class="tableContents">${employee.lastName}</td>
        <td class="tableContents">${employee.idNumber}</td>
        <td class="tableContents">${employee.jobTitle}</td>
        <td class="tableContents">${employee.annualSalary}</td>
        <td class="deleteBtn"><button class="removeEmployeeBtn">Delete</button></td>
        </tr>
    `);
    $( `tbody tr:even` ).addClass( "white" );
    }
} // end showEmployees
