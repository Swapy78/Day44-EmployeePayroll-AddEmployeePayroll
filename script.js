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
