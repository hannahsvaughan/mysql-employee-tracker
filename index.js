// INCLUDE PACKAGES NEEDED FOR THIS APPLICATION
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

// SET UP MYSQL CONNECTION
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    // Note - LEAVE EMPTY STRING FOR YOUR PW
    password: '',
    database: 'employees_db',
},
    console.log(`Connected to the employees_db database.`)
);

// MAIN QUESTIONS
const startMenu = [
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
            // "Update An Employee's Role"
        ]
    }
]

// DEPARTMENT QUESTION
const depQuestions = [
    {
        type: 'input',
        name: 'newDepartment',
        message: "What is the new department name?"
    },
]

// ROLE QUESTIONS
const roleQuestions = [
    {
        type: 'input',
        name: 'roleTitle',
        message: "What is the title of the new role?"
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "What is the salary for this role?"
    },
    {
        type: 'list',
        name: 'depId',
        message: "What is the Department ID for this new role?",
        choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
]

// EMPLOYEE QUESTIONS
const empQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "Enter the new employee's first name"
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter the new employee's last name"
    },
    {
        type: 'input',
        name: 'jobTitle',
        message: "What is the employee's job title?"
    },
    {
        type: 'input',
        name: 'managerId',
        message: "What is the manager's ID for this employee",
    },
    {
        type: 'list',
        name: 'roleId',
        message: "Please choose the role ID for this new employee",
        choices: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
]

// // UPDATE QUESTIONS
// const updateQuestions = [
//     {
//         type: 'input',
//         name: 'empID',
//         message: "What is the employee's ID number?"
//     },
//     {
//         type: 'input',
//         name: 'updateRole',
//         message: "What is the employee's new job title?"
//     },
// ]

const runSearch = () => {
    return inquirer
        .prompt(startMenu).then((data) => {
            // SWITCH CASE FOR FIRST CHOICES
            switch (data.choice) {
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
                // VIEW DEPARTMENT TABLE
                case "View Departments":
                    db.query(`SELECT * FROM department`, function (err, results) {
                        if (err) {
                            console.log(err);
                        } else 
                        console.table(results);
                        runSearch();
                    });
                    break;
                //VIEW ROLE TABLE
                case "View Roles":
                    db.query(`SELECT * FROM role`, function (err, results) {
                        console.table(results);
                        runSearch();
                    });
                    break;
                //VIEW EMPLOYEE TABLE
                case "View Employees":
                    db.query(`SELECT * FROM employee`, function (err, results) {
                        console.table(results);
                        runSearch();
                    });
                    break;
            }
        })
}

// ADD EMPLOYEE TO EMPLOYEE TABLE - DO THIS ONE FIRST, MAKE SURE IT WORKS, THEN DO SAME FOR OTHERS
const addEmployee = () => {
    return inquirer
        .prompt(empQuestions).then((data) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", "${data.roleId}", "${data.managerId}")`, (err, results) => {
                if (err) {
                    console.log(err)
                } else
                    console.log(`${data.firstName} ${data.lastName} has been added to database.`)
            });
            runSearch();
        })
}

// ADD ROLE TO ROLE TABLE
const addRole = () => {
    return inquirer
        .prompt(roleQuestions).then((data) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.jobTitle}", "${data.roleSalary}", "${data.depId}")`, (err, result) => {
                if (err) {
                    console.log(err)
                } else
                    console.log(`${data.jobTitle} has been added to the database`)
            });
            runSearch();
        })
}


// ADD DEPARTMENT TO DEPARTMENT TABLE
const addDepartment = () => {
    return inquirer
        .prompt(depQuestions).then((data) => {
            db.query(`INSERT INTO department(department_name) VALUES ("${data.newDepartment}")`, (err, result) => {
                if (err) {
                    console.log(err)
                } else
                    console.log(`${data.newDepartment} has been added to the database`)
            });
            runSearch();
        })
}

// const updateRole = () => {
//     return inquirer
//         .prompt(updateQuestions).then((data) => {
//             db.query(`UPDATE employee SET job_title = "${data.updateRole}" WHERE id ="${data.empId}"`, (err, result) => {
//                 if (err) {
//                     console.log(err)
//                 } else
//                     console.log(`A new ${data.updateRole} has been added to the database`)
//             });
//             runSearch();
//         })
// }
// INITIALIZE
runSearch();








