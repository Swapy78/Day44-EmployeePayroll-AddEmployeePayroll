
// Employee Payroll Data Object
class EmployeePayroll {
  constructor() {
    this._id = ' ';
    this._name = '';
    this.profile = '';
    this.gender = '';
    this.department = [];
    this.salary = 0;
    this.startDate = null;
    this.notes = '';
  }

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
    const nameRegex = /^[A-Z]{1}[a-zA-Z\s]{2,}$/;
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const empDate = !this.startDate ? 'undefined' : this.startDate.toLocaleDateString('en-US', options);
    return `id: ${this.id}, Name: ${this.name}, Profile: ${this.profile}, Gender: ${this.gender}, Department: ${this.department}, Salary: ${this.salary}, Start Date: ${empDate}, Notes: ${this.notes}`;
  }
}

function populateSelectOptions(selectId, startValue, endValue) {
  const selectElement = document.getElementById(selectId);
  for (let i = startValue; i <= endValue; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}

function getCurrentDateAsString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validateName(name) {
  const nameRegex = /^[A-Z]{1}[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
}

function validateStartDate(startDate) {
  const now = new Date();
  const joiningDate = new Date(startDate);

  now.setHours(0, 0, 0, 0);
  joiningDate.setHours(0, 0, 0, 0);

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return joiningDate <= now && joiningDate >= thirtyDaysAgo;
}

function updateSalaryValue() {
  const salaryRange = document.getElementById('salary');
  const salaryValueOutput = document.getElementById('salaryValue');
  salaryValueOutput.textContent = salaryRange.value;
}

function resetUI() {
  document.getElementById('nameError').textContent = '';
  document.getElementById('dateError').textContent = '';
}

function save() {
  resetUI();
  try {
    const employeePayroll = new EmployeePayroll();
    employeePayroll.name = document.getElementById('name').value;
    employeePayroll.profile = document.querySelector('input[name="profile"]:checked').value;
    employeePayroll.gender = document.querySelector('input[name="gender"]:checked').value;
    const departmentCheckboxes = document.querySelectorAll('input[name="department"]:checked');
    employeePayroll.department = Array.from(departmentCheckboxes).map(checkbox => checkbox.value);
    employeePayroll.salary = parseFloat(document.getElementById('salary').value);

    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const startDateString = `${year}-${month}-${day}`;

    if (!validateName(employeePayroll.name)) {
      throw 'Name is incorrect! Name must start with a capital letter and have a minimum of 3 characters.';
    }

    const currentDate = getCurrentDateAsString();
    if (startDateString > currentDate) {
      throw "Start Date cannot be a future date.";
    }
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoString = thirtyDaysAgo.toISOString().split('T')[0];
    if (startDateString < thirtyDaysAgoString) {
      throw "Start Date should be within 30 days of joining.";
    }

    employeePayroll.startDate = startDateString;
    employeePayroll.notes = document.getElementById('notes').value;

    console.log(employeePayroll.toString());

    alert('Employee Payroll saved successfully!');
  } catch (error) {
    if (error === 'Name is incorrect! Name must start with a capital letter and have a minimum of 3 characters.') {
      document.getElementById('nameError').textContent = error;
    } else if (error === "Start Date cannot be a future date." || error === "Start Date should be within 30 days of joining.") {
      document.getElementById('dateError').textContent = error;
    } else {
      alert(error);
    }
  }
}

function initializeForm() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  populateSelectOptions('day', 1, 31);
  populateSelectOptions('month');
  populateSelectOptions('year', currentYear, currentYear - 100);

  const form = document.querySelector('.form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    save();
  });

  const salaryRange = document.getElementById('salary');
  const salaryValueOutput = document.getElementById('salaryValue');
  salaryRange.addEventListener('input', updateSalaryValue);
  salaryValueOutput.textContent = salaryRange.value;
}

document.addEventListener('DOMContentLoaded', initializeForm);