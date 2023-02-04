// INCLUDE PACKAGES NEEDED FOR THIS APPLICATION
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// SET UP MYSQL CONNECTION
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    // Note - LEAVE EMPTY STRING FOR YOUR PW
    password: ' ',
    database: 'employees_db',
});



// MAIN QUESTIONS
const mainQuestions = [
    {
        name: "choice",
        type: 'list',
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add New Department",
            "Add New Role",
            "Add New Employee",
            "Update An Employee's Role"
        ]
    }
]

// // DEPARTMENT QUESTIONS
const depQuestions = [
    {
        name: 'newDepartment',
        type: 'input',
        message: "What is the new department name?"
    },
]

// ROLE QUESTIONS
const roleQuestions = [
    {
        name: 'roleTitle',
        type: 'input',
        message: "What is the title of the new role?"
    },
    {
        name: 'roleSalary',
        type: 'input',
        message: "What is the salary for this role?"
    },
    {
        name: 'depId',
        type: 'list',
        message: "What is the Department ID for this new role?",
        choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
]

// EMPLOYEE QUESTIONS
const empQuestions = [
    {
        name: 'firstName',
        type: 'input',
        message: "Enter the new employee's first name"
    },
    {
        name: 'lastName',
        type: 'input',
        message: "Enter the new employee's last name"
    },
    {
        name: 'jobTitle',
        type: 'input',
        message: "What is the employee's job title?"
    },
    {
        name: 'managerId',
        type: 'input',
        message: "What is the manager's ID for this employee",
    },
    {
        name: 'roleId',
        type: 'list',
        message: "Please choose the role ID for this new employee",
        choices: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
]

// // UPDATE QUESTIONS
const updateQuestions = [
    {
        name: 'empID',
        type: 'input',
        message: "What is the employee's ID number?"
    },
    {
        name: 'updateRole',
        type: 'input',
        message: "What is the employee's new job title?"
    },
]

const runSearch = () => {
    return inquirer
    .prompt(mainQuestions).then((data) => {
        // SWITCH CASE FOR FIRST CHOICES
        switch (data.choices) {
            case "Add New Department":
                addDepartment();
                break;
            case "Add New Role":
                addRole();
                break;
            case "Add New Employee":
                addEmployee();
                break;
            case "Update Employee's Job Title":
                updateRole();
                break;
        //VIEW ALL DEPARTMENTS
            case "View Departments":
                db.query(`SELECT * FROM departments`, function (err,results) {
                    console.table(results);
                    runSearch();
                });
                break;


        //VIEW ROLES
            case "View Roles":

        //VIEW EMPLOYEES
            case "View Employees"
        }
    })
}

// ADD EMPLOYEE TO EMPLOYEE TABLE

// VIEW ALL ROLES IN ROLE TABLE

// ADD ROLE TO ROLE TABLE

// VIEW ALL DEPARTMENTS IN DEPARTMENT TABLE

// ADD DEPARTMENT TO DEPARTMENT TABLE










