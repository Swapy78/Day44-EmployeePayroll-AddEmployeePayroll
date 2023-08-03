// script.js

// Employee Payroll Data Object
class EmployeePayroll {
  constructor() {
    this._id = ' ';
    this._name = '';
    this._profile = '';
    this._gender = '';
    this._department = [];
    this._salary = 0;
    this._startDate = null;
    this._notes = '';
  }

  // Getter and Setter methods
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }
  get name() {
    return this._name;
  }

  set name(name) {
      let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
      if (nameRegex.test(name)) {
        this._name = name;
      } else {
        throw 'Name is incorrect! Name must start with a capital letter and have a minimum of 3 characters.';
      }
    }
  

  get profile() {
    return this._profile;
  }

  set profile(profile) {
    this._profile = profile;
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    this._gender = gender;
  }

  get department() {
    return this._department;
  }

  set department(department) {
    this._department = department;
  }

  get salary() {
    return this._salary;
  }

  set salary(salary) {
    if (salary > 0) {
      this._salary = salary;
      // Update the displayed salary value
      updateSalaryValue();
    } else {
      throw 'Salary should be greater than 0!';
    }
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(startDate) {
      let now = new Date();
      let joiningDate = new Date(startDate);
      let thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

      if (joiningDate > now) {
          throw "Start Date cannot be a future date.";
        } else if (joiningDate < thirtyDaysAgo) {
          throw "Start Date should be within 30 days of joining.";
        } else {
          this._startDate = startDate;
        }
      }

  get notes() {
    return this._notes;
  }

  set notes(notes) {
    this._notes = notes;
  }

  // Additional fields can be added as required

  // To String method for printing EmployeePayroll object
  toString() {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const empDate = !this.startDate ? "undefined" :
                    this.startDate.toLocalDateString("en-US", Options);
    return `id: ${this.id}, Name: ${this.name}, Profile: ${this.profile}, Gender: ${this.gender}, Department: ${this.department}, Salary: ${this.salary}, Start Date: ${this.startDate}, Notes: ${this.notes}`;
  }
}

// Function to save data on form submit
function save() {
  // Get form data and create EmployeePayroll object
  const employeePayroll = new EmployeePayroll();
  try {
    employeePayroll.name = document.getElementById('name').value;
    employeePayroll.profile = document.querySelector('input[name="profile"]:checked').value;
    employeePayroll.gender = document.querySelector('input[name="gender"]:checked').value;
    const departmentCheckboxes = document.querySelectorAll('input[name="department"]:checked');
    const departmentArray = [];
    departmentCheckboxes.forEach(checkbox => departmentArray.push(checkbox.value));
    employeePayroll.department = departmentArray;
    employeePayroll.salary = document.getElementById('salary').value;
    // You can add additional fields here and set them in the EmployeePayroll object

    // Display the EmployeePayroll object details
    console.log(employeePayroll.toString());

    // Perform any further actions, like saving the object to the database, etc.
  } catch (error) {
    alert(error);
  }
}
function updateSalaryValue() {
  const salaryRange = document.getElementById('salary');
  const salaryValueOutput = document.getElementById('salaryValue');
  salaryValueOutput.innerText = salaryRange.value;
}

// Function to validate name
function validateName(name) {
  const nameRegex = /^[A-Z]{1}[a-zA-Z\s]{2,}$/;
  if (nameRegex.test(name)) {
    return true;
  } else {
    return false;
  }
}

// Function to validate start date
function validateStartDate(startDate) {
  const now = new Date();
  const joiningDate = new Date(startDate);
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

  if (joiningDate > now) {
    return false;
  } else if (joiningDate < thirtyDaysAgo) {
    return false;
  } else {
    return true;
  }
}

// Event listener when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Event listener for the salary range input
  const salaryRange = document.getElementById('salary');
  const salaryValueOutput = document.getElementById('salaryValue');
  salaryRange.addEventListener('input', updateSalaryValue);

   // Event listener for form submission
   const form = document.querySelector('form');
   form.addEventListener('submit', (event) => {
     event.preventDefault();
    // Get form data and create EmployeePayroll object
    const employeePayroll = new EmployeePayroll();
    try {
      const name = document.getElementById('name').value;
      if (validateName(name)) {
        employeePayroll.name = name;
      } else {
        throw 'Name is incorrect! Name must start with a capital letter and have a minimum of 3 characters.';
      }
      employeePayroll.profile = document.querySelector('input[name="profile"]:checked').value;
      employeePayroll.gender = document.querySelector('input[name="gender"]:checked').value;
      const departmentCheckboxes = document.querySelectorAll('input[name="department"]:checked');
      const departmentArray = [];
      departmentCheckboxes.forEach(checkbox => departmentArray.push(checkbox.value));
      employeePayroll.department = departmentArray;

      const salary = document.getElementById('salary').value;
      employeePayroll.salary = salary;

      const startDate = document.getElementById('day').value + '-' + document.getElementById('month').value + '-' + document.getElementById('year').value;
      if (validateStartDate(startDate)) {
        employeePayroll.startDate = startDate;
      } else {
        throw "Invalid start date. Start Date cannot be a future date and should be within 30 days of joining.";
      }

      employeePayroll.notes = document.getElementById('notes').value;

      // Display the EmployeePayroll object details
      console.log(employeePayroll.toString());

      // Perform any further actions, like saving the object to the database, etc.
    } catch (error) {
      alert(error);
    }
  });
});
